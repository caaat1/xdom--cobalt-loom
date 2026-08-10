import assert from 'node:assert/strict'
import { test } from 'node:test'

import { JSDOM } from 'jsdom'

import { TextBlueprint } from '../../../src/(node)/(child)/(characterData)/text/blueprint/class.js'
import { TextBuilder } from '../../../src/(node)/(child)/(characterData)/text/builder/class.js'
import type { TextBuilt } from '../../../src/(node)/(child)/(characterData)/text/built/class.js'
import { MoleculePath } from '../../../src/tool/molecule/path/class.js'

function makeDoc(): Document {
  return new JSDOM('<!doctype html><html><body></body></html>').window.document
}

await test('getBuilder() forwards doc/nodeBlueprint and defaults param when none is given', () => {
  const blueprint = new TextBlueprint()
  const doc = makeDoc()

  const builder = blueprint.getBuilder({ docSource: { doc } })

  assert.equal(builder.doc, doc)
  assert.equal(builder.nodeBlueprint, blueprint)
  assert.deepEqual(builder.param, { data: '' })
})

await test("getBuilder()'s param overrides only the keys it specifies, defaulting the rest", () => {
  const blueprint = new TextBlueprint()
  const builder = blueprint.getBuilder({
    docSource: { doc: makeDoc() },
    param: { data: 'hello' },
  })

  assert.deepEqual(builder.param, { data: 'hello' })
})

await test('an explicit moleculePath passed to getBuilder is used instead of a fresh one', () => {
  const blueprint = new TextBlueprint()
  const moleculePath = new MoleculePath()

  const builder = blueprint.getBuilder({
    docSource: { doc: makeDoc() },
    moleculePath,
  })

  assert.equal(builder.moleculePath, moleculePath)
})

await test('omitting moleculePath gives every builder its own fresh, empty one', () => {
  const blueprint = new TextBlueprint()
  const builder = blueprint.getBuilder({ docSource: { doc: makeDoc() } })

  assert.ok(builder.moleculePath instanceof MoleculePath)
  assert.equal(builder.moleculePath.length, 0)
})

// build()/createNode() are intentionally `protected` on TextBuilder (and its
// CharacterDataBuilder/NodeBuilder bases) — nothing outside the class
// hierarchy is meant to call them directly yet. Exposing build() through a
// minimal test-local subclass is the same technique documentType.test.ts
// already uses.
class TestableTextBuilder extends TextBuilder {
  publicBuild(): TextBuilt {
    return this.build()
  }
}

await test('build() creates a real Text node via doc.createTextNode, with data defaulted', () => {
  const nodeBlueprint = new TextBlueprint()
  const builder = new TestableTextBuilder({
    docSource: { doc: makeDoc() },
    nodeBlueprint,
    param: undefined,
  })

  const built = builder.publicBuild()

  assert.equal(built.node.nodeType, built.node.TEXT_NODE)
  assert.equal(built.node.data, '')
  assert.equal(built.nodeBlueprint, nodeBlueprint)
  assert.equal(built.moleculePath, builder.moleculePath)
})

await test('build() forwards an explicit data param onto the real Text node', () => {
  const nodeBlueprint = new TextBlueprint()
  const builder = new TestableTextBuilder({
    docSource: { doc: makeDoc() },
    nodeBlueprint,
    param: { data: 'hello' },
  })

  const built = builder.publicBuild()

  assert.equal(built.node.data, 'hello')
})
