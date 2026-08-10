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

function hasReadonlyModifier(modifiers) {
  if (!modifiers) {
    return false
  }
  for (const m of modifiers) {
    if (m.kind === ts.SyntaxKind.ReadonlyKeyword) {
      return true
    }
  }
  return false
}

const rule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        "Disallow dropping a member's `readonly` modifier relative to what an ancestor class declares -- TS does not enforce this itself: a subclass's own (re)declaration governs mutability for its own member independently of an ancestor's `readonly`, confirmed empirically (a subclass overriding a `readonly` abstract member without repeating `readonly` may freely reassign it, even via a reference typed as the ancestor's abstract member).",
      recommended: false,
    },
    schema: [],
    messages: {
      readonlyDropped:
        "Member '{{name}}' is declared `readonly` on ancestor '{{ancestor}}' but not here; keep it `readonly`, or the ancestor's `readonly` is a lie for this subclass.",
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

        const classType = checker.getTypeAtLocation(tsClassNode)
        const baseTypes = classType?.getBaseTypes?.() ?? []
        if (baseTypes.length === 0) {
          return
        }

        const bodyElements = esClassNode.body?.body ?? []

        for (const element of bodyElements) {
          if (element.type !== 'PropertyDefinition') {
            continue
          }

          const tsElement =
            parserServices.esTreeNodeToTSNodeMap.get(element) ??
            (element.key &&
              parserServices.esTreeNodeToTSNodeMap.get(element.key))
          if (!tsElement || !ts.isPropertyDeclaration(tsElement)) {
            continue
          }

          const name = getMemberNameFromTS(tsElement)
          if (!name) {
            continue
          }

          // First ancestor declaring this member `readonly` wins -- we only
          // need to know whether one exists, and its name for the message.
          let ancestorName = null
          for (const base of baseTypes) {
            const prop = base.getProperty(name)
            if (!prop) {
              continue
            }
            const readonlyDecl = (prop.declarations ?? []).find(
              (decl) =>
                ts.isPropertyDeclaration(decl) &&
                hasReadonlyModifier(decl.modifiers)
            )
            if (readonlyDecl) {
              ancestorName = base.symbol?.name ?? 'an ancestor'
              break
            }
          }

          if (!ancestorName) {
            continue
          }

          if (!hasReadonlyModifier(tsElement.modifiers)) {
            context.report({
              node: element.key ?? element,
              messageId: 'readonlyDropped',
              data: { name, ancestor: ancestorName },
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
    'no-readonly-widening': rule,
  },
}
export { plugin as pluginNoReadonlyWidening }
export default plugin
