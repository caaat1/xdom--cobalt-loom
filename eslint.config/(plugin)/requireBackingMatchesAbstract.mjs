import ts from 'typescript'

function getMemberNameFromTS(node) {
  if (!node || !('name' in node) || !node.name) {
    return null
  }
  const nameNode = node.name
  if (
    ts.isIdentifier(nameNode) ||
    ts.isStringLiteral(nameNode) ||
    ts.isNumericLiteral(nameNode)
  ) {
    return nameNode.text
  }
  return null
}

const BACK_DECORATOR_NAMES = new Set(['backMethod', 'backProperty'])

// @backMethod/@backProperty are applied bare — see
// src/tool/(decorator)/(member)/{method,property}/back/function.ts — neither
// is a decorator factory, so the decorator expression is always a plain
// Identifier, never a CallExpression.
function getBackDecoratorName(tsElement) {
  const decorators = ts.getDecorators(tsElement)
  if (!decorators) {
    return null
  }
  for (const decorator of decorators) {
    const expr = decorator.expression
    if (ts.isIdentifier(expr) && BACK_DECORATOR_NAMES.has(expr.text)) {
      return expr.text
    }
  }
  return null
}

function isMemberDeclaration(node) {
  return (
    ts.isMethodDeclaration(node) ||
    ts.isPropertyDeclaration(node) ||
    ts.isGetAccessor(node) ||
    ts.isSetAccessor(node)
  )
}

function isAbstractDecl(decl) {
  return (ts.getCombinedModifierFlags(decl) & ts.ModifierFlags.Abstract) !== 0
}

// Instance members: base classes are visible through the checker's own type
// system, so walking `classType.getBaseTypes()` and reading `base.getProperty`
// (as the sibling rules in this directory already do) is enough — verified
// against a throwaway probe that this returns both abstract and concrete
// instance declarations correctly.
function findInstanceAncestorDecls(baseTypes, name) {
  const decls = []
  for (const base of baseTypes) {
    const prop = base.getProperty(name)
    if (!prop) {
      continue
    }
    for (const decl of prop.declarations ?? []) {
      if (isMemberDeclaration(decl)) {
        decls.push({ decl, ancestorName: base.symbol?.name })
      }
    }
  }
  return decls
}

// Static members: TS's checker exposes no direct "static side of the base
// class" type (confirmed empirically — getTypeAtLocation on a class node
// only ever returns the instance type), so walk the `extends` chain via
// heritage-clause symbols instead and read each ancestor's own `.members`
// directly off the AST, filtering to `static`.
function getBaseClassDecl(checker, classDecl) {
  const heritage = classDecl.heritageClauses?.find(
    (h) => h.token === ts.SyntaxKind.ExtendsKeyword
  )
  const expr = heritage?.types[0]?.expression
  if (!expr) {
    return null
  }
  let sym = checker.getSymbolAtLocation(expr)
  // An ancestor `extends`ed from another module resolves to an import
  // binding first (declarations: [ImportSpecifier]), not the class itself —
  // confirmed empirically via a throwaway probe once the RuleTester suite's
  // cross-file fixtures caught this returning no ancestor at all. Same-file
  // ancestors (as in the sibling rules' own fixtures) never hit this branch,
  // which is how it went unnoticed before there were cross-file fixtures.
  if (sym !== undefined && (sym.flags & ts.SymbolFlags.Alias) !== 0) {
    sym = checker.getAliasedSymbol(sym)
  }
  const decl = sym?.declarations?.find(
    (d) => ts.isClassDeclaration(d) || ts.isClassExpression(d)
  )
  return decl ?? null
}

function findStaticAncestorDecls(checker, tsClassNode, name) {
  const decls = []
  let ancestor = getBaseClassDecl(checker, tsClassNode)
  while (ancestor) {
    for (const member of ancestor.members) {
      if (!isMemberDeclaration(member)) {
        continue
      }
      const isStatic =
        (ts.getCombinedModifierFlags(member) & ts.ModifierFlags.Static) !== 0
      if (isStatic && getMemberNameFromTS(member) === name) {
        decls.push({ decl: member, ancestorName: ancestor.name?.text })
      }
    }
    ancestor = getBaseClassDecl(checker, ancestor)
  }
  return decls
}

const rule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Statically verify @backMethod/@backProperty: the member must not already exist as a concrete member on an ancestor, and must correspond to an abstract member declared somewhere up the chain — the positive half enforceBacking cannot prove at runtime, since abstract members are fully erased by then.',
      recommended: false,
    },
    schema: [],
    messages: {
      shadowsConcreteAncestor:
        "'{{name}}' is marked @{{decorator}} but already exists as a concrete member on '{{ancestor}}' — use 'override' instead of @{{decorator}} if this intentionally overrides it.",
      noAbstractAncestor:
        "'{{name}}' is marked @{{decorator}} but no ancestor declares it as an abstract member — @{{decorator}} should back a genuinely new abstract member, not stand in for one that doesn't exist.",
    },
  },
  create(context) {
    const parserServices =
      context.parserServices ?? context.sourceCode.parserServices
    if (!parserServices?.program) {
      return {}
    }
    const checker = parserServices.program.getTypeChecker()

    function checkClassBody(esClassNode) {
      try {
        if (!parserServices.esTreeNodeToTSNodeMap) {
          return
        }
        const tsClassNode =
          parserServices.esTreeNodeToTSNodeMap.get(esClassNode)
        if (!tsClassNode) {
          return
        }

        const bodyElements = esClassNode.body?.body ?? []

        // Cheap AST-only pass first: only classes with at least one
        // back-decorated member need the (pricier) type-checker work below.
        const backedElements = []
        for (const element of bodyElements) {
          if (
            element.type !== 'MethodDefinition' &&
            element.type !== 'PropertyDefinition'
          ) {
            continue
          }
          if (element.kind === 'constructor') {
            continue
          }
          const tsElement = parserServices.esTreeNodeToTSNodeMap.get(element)
          if (!tsElement) {
            continue
          }
          const decoratorName = getBackDecoratorName(tsElement)
          if (!decoratorName) {
            continue
          }
          const name = getMemberNameFromTS(tsElement)
          if (!name) {
            continue
          }
          backedElements.push({
            element,
            isStatic: element.static === true,
            name,
            decoratorName,
          })
        }
        if (backedElements.length === 0) {
          return
        }

        const classType = checker.getTypeAtLocation(tsClassNode)
        const instanceBaseTypes = classType?.getBaseTypes?.() ?? []

        for (const {
          element,
          isStatic,
          name,
          decoratorName,
        } of backedElements) {
          const ancestorDecls = isStatic
            ? findStaticAncestorDecls(checker, tsClassNode, name)
            : findInstanceAncestorDecls(instanceBaseTypes, name)

          const concreteDecl = ancestorDecls.find(
            ({ decl }) => !isAbstractDecl(decl)
          )
          if (concreteDecl) {
            context.report({
              node: element.key ?? element,
              messageId: 'shadowsConcreteAncestor',
              data: {
                name,
                decorator: decoratorName,
                ancestor: concreteDecl.ancestorName ?? 'an ancestor',
              },
            })
            continue
          }

          const hasAbstractAncestor = ancestorDecls.some(({ decl }) =>
            isAbstractDecl(decl)
          )
          if (!hasAbstractAncestor) {
            context.report({
              node: element.key ?? element,
              messageId: 'noAbstractAncestor',
              data: { name, decorator: decoratorName },
            })
          }
        }
      } catch (err) {
        console.error(err)
      }
    }

    return {
      ClassDeclaration: checkClassBody,
      ClassExpression: checkClassBody,
    }
  },
}

const plugin = {
  rules: {
    'require-backing-matches-abstract': rule,
  },
}
export { plugin as pluginRequireBackingMatchesAbstract }
export default plugin
