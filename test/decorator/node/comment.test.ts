import assert from 'node:assert/strict'
import { test } from 'node:test'

import { JSDOM } from 'jsdom'

import { CommentBlueprint } from '../../../src/(node)/(child)/(characterData)/comment/blueprint/class.js'
import { CommentBuilder } from '../../../src/(node)/(child)/(characterData)/comment/builder/class.js'
import type { CommentBuilt } from '../../../src/(node)/(child)/(characterData)/comment/built/class.js'
import { MoleculePath } from '../../../src/tool/molecule/path/class.js'

function makeDoc(): Document {
  return new JSDOM('<!doctype html><html><body></body></html>').window.document
}

await test('getBuilder() forwards doc/nodeBlueprint and defaults param when none is given', () => {
  const blueprint = new CommentBlueprint()
  const doc = makeDoc()

  const builder = blueprint.getBuilder({ docSource: { doc } })

  assert.equal(builder.doc, doc)
  assert.equal(builder.nodeBlueprint, blueprint)
  assert.deepEqual(builder.param, { data: '' })
})

await test("getBuilder()'s param overrides only the keys it specifies, defaulting the rest", () => {
  const blueprint = new CommentBlueprint()
  const builder = blueprint.getBuilder({
    docSource: { doc: makeDoc() },
    param: { data: 'a note' },
  })

  assert.deepEqual(builder.param, { data: 'a note' })
})

await test('an explicit moleculePath passed to getBuilder is used instead of a fresh one', () => {
  const blueprint = new CommentBlueprint()
  const moleculePath = new MoleculePath()

  const builder = blueprint.getBuilder({
    docSource: { doc: makeDoc() },
    moleculePath,
  })

  assert.equal(builder.moleculePath, moleculePath)
})

await test('omitting moleculePath gives every builder its own fresh, empty one', () => {
  const blueprint = new CommentBlueprint()
  const builder = blueprint.getBuilder({ docSource: { doc: makeDoc() } })

  assert.ok(builder.moleculePath instanceof MoleculePath)
  assert.equal(builder.moleculePath.length, 0)
})

// build()/createNode() are intentionally `protected` on CommentBuilder (and
// its CharacterDataBuilder/NodeBuilder bases) — nothing outside the class
// hierarchy is meant to call them directly yet. Exposing build() through a
// minimal test-local subclass is the same technique documentType.test.ts
// already uses.
class TestableCommentBuilder extends CommentBuilder {
  publicBuild(): CommentBuilt {
    return this.build()
  }
}

await test('build() creates a real Comment via doc.createComment, with data defaulted', () => {
  const nodeBlueprint = new CommentBlueprint()
  const builder = new TestableCommentBuilder({
    docSource: { doc: makeDoc() },
    nodeBlueprint,
    param: undefined,
  })

  const built = builder.publicBuild()

  assert.equal(built.node.nodeType, built.node.COMMENT_NODE)
  assert.equal(built.node.data, '')
  assert.equal(built.nodeBlueprint, nodeBlueprint)
  assert.equal(built.moleculePath, builder.moleculePath)
})

await test('build() forwards an explicit data param onto the real Comment', () => {
  const nodeBlueprint = new CommentBlueprint()
  const builder = new TestableCommentBuilder({
    docSource: { doc: makeDoc() },
    nodeBlueprint,
    param: { data: 'a note' },
  })

  const built = builder.publicBuild()

  assert.equal(built.node.data, 'a note')
})
