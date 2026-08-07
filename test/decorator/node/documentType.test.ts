import assert from 'node:assert/strict'
import { test } from 'node:test'

import { JSDOM } from 'jsdom'

import { DocumentTypeBlueprint } from '../../../src/(node)/(child)/documentType/blueprint/class.js'
import { DocumentTypeBuilder } from '../../../src/(node)/(child)/documentType/builder/class.js'
import type { DocumentTypeBuilt } from '../../../src/(node)/(child)/documentType/built/class.js'
import { MoleculePath } from '../../../src/tool/molecule/path/class.js'

function makeDoc(): Document {
  return new JSDOM('<!doctype html><html><body></body></html>').window.document
}

await test('getBuilder() forwards doc/nodeBlueprint and defaults param when none is given', () => {
  const blueprint = new DocumentTypeBlueprint()
  const doc = makeDoc()

  const builder = blueprint.getBuilder({ docSource: { doc } })

  assert.equal(builder.doc, doc)
  assert.equal(builder.nodeBlueprint, blueprint)
  assert.deepEqual(builder.param, {
    qualifiedName: 'html',
    publicId: '',
    systemId: '',
  })
})

await test("getBuilder()'s param overrides only the keys it specifies, defaulting the rest", () => {
  const blueprint = new DocumentTypeBlueprint()
  const builder = blueprint.getBuilder({
    docSource: { doc: makeDoc() },
    param: { qualifiedName: 'math' },
  })

  assert.deepEqual(builder.param, {
    qualifiedName: 'math',
    publicId: '',
    systemId: '',
  })
})

await test('an explicit moleculePath passed to getBuilder is used instead of a fresh one', () => {
  const blueprint = new DocumentTypeBlueprint()
  const moleculePath = new MoleculePath()

  const builder = blueprint.getBuilder({
    docSource: { doc: makeDoc() },
    moleculePath,
  })

  assert.equal(builder.moleculePath, moleculePath)
})

await test('omitting moleculePath gives every builder its own fresh, empty one', () => {
  const blueprint = new DocumentTypeBlueprint()
  const builder = blueprint.getBuilder({ docSource: { doc: makeDoc() } })

  assert.ok(builder.moleculePath instanceof MoleculePath)
  assert.equal(builder.moleculePath.length, 0)
})

// build()/createNode() are intentionally `protected` on DocumentTypeBuilder
// (and its NodeBuilder base) — nothing outside the class hierarchy is meant
// to call them directly yet. Exposing build() through a minimal test-local
// subclass is the same technique test/unit/user/userInputHandler.test.ts
// already uses for UserInputHandler's own protected `input`.
class TestableDocumentTypeBuilder extends DocumentTypeBuilder {
  publicBuild(): DocumentTypeBuilt {
    return this.build()
  }
}

await test('build() creates a real DocumentType via doc.implementation.createDocumentType', () => {
  const nodeBlueprint = new DocumentTypeBlueprint()
  const builder = new TestableDocumentTypeBuilder({
    docSource: { doc: makeDoc() },
    nodeBlueprint,
    param: {
      qualifiedName: 'svg:svg',
      publicId: '-//W3C//DTD SVG 1.1//EN',
      systemId: 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd',
    },
  })

  const built = builder.publicBuild()

  assert.equal(built.node.name, 'svg:svg')
  assert.equal(built.node.publicId, '-//W3C//DTD SVG 1.1//EN')
  assert.equal(
    built.node.systemId,
    'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'
  )
  assert.equal(built.nodeBlueprint, nodeBlueprint)
  assert.equal(built.moleculePath, builder.moleculePath)
})
