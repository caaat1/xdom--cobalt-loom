import assert from 'node:assert/strict'
import { test } from 'node:test'

import { JSDOM } from 'jsdom'

import { DocumentBlueprint } from '../../../src/(node)/(parent)/document/blueprint/class.js'
import { DocumentBuilder } from '../../../src/(node)/(parent)/document/builder/class.js'
import type { DocumentBuilt } from '../../../src/(node)/(parent)/document/built/class.js'
import { MoleculePath } from '../../../src/tool/molecule/path/class.js'

function makeDoc(): Document {
  return new JSDOM('<!doctype html><html><body></body></html>').window.document
}

await test('getBuilder() forwards doc/nodeBlueprint and defaults param to the empty param map', () => {
  const blueprint = new DocumentBlueprint()
  const doc = makeDoc()

  const builder = blueprint.getBuilder({ docSource: { doc } })

  assert.equal(builder.doc, doc)
  assert.equal(builder.nodeBlueprint, blueprint)
  assert.deepEqual(builder.param, {})
})

await test('an explicit moleculePath passed to getBuilder is used instead of a fresh one', () => {
  const blueprint = new DocumentBlueprint()
  const moleculePath = new MoleculePath()

  const builder = blueprint.getBuilder({
    docSource: { doc: makeDoc() },
    moleculePath,
  })

  assert.equal(builder.moleculePath, moleculePath)
})

await test('omitting moleculePath gives every builder its own fresh, empty one', () => {
  const blueprint = new DocumentBlueprint()
  const builder = blueprint.getBuilder({ docSource: { doc: makeDoc() } })

  assert.ok(builder.moleculePath instanceof MoleculePath)
  assert.equal(builder.moleculePath.length, 0)
})

// build()/createNode() are intentionally `protected` on DocumentBuilder (and
// its NodeParentBuilder/NodeBuilder bases) — nothing outside the class
// hierarchy is meant to call them directly yet. Exposing build() through a
// minimal test-local subclass is the same technique text.test.ts and
// documentType.test.ts already use.
class TestableDocumentBuilder extends DocumentBuilder {
  publicBuild(): DocumentBuilt {
    return this.build()
  }
}

await test('build() wraps the real Document passed in via docSource, unchanged', () => {
  const nodeBlueprint = new DocumentBlueprint()
  const doc = makeDoc()
  const builder = new TestableDocumentBuilder({
    docSource: { doc },
    nodeBlueprint,
    param: undefined,
  })

  const built = builder.publicBuild()

  // DocumentBuilder.createNode() is an identity function — Document isn't
  // created via doc.createX(...) the way child nodes are, it *is* the doc.
  assert.equal(built.node, doc)
  assert.equal(built.nodeBlueprint, nodeBlueprint)
  assert.equal(built.moleculePath, builder.moleculePath)
})
