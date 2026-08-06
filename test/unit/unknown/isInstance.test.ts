import assert from 'node:assert/strict'
import { test } from 'node:test'

import { isInstance } from '../../../src/tool/unknown/(object)/(notNull)/instance/is/function.js'

await test('isInstance accepts a class instance', () => {
  class Foo {}
  assert.equal(isInstance(new Foo()), true)
})

await test('isInstance accepts an array', () => {
  assert.equal(isInstance([]), true)
})

await test('isInstance accepts a Date', () => {
  assert.equal(isInstance(new Date()), true)
})

await test('isInstance rejects a plain object literal', () => {
  assert.equal(isInstance({}), false)
})

await test('isInstance accepts a null-prototype object', () => {
  // By this module's own pojo/instance prototype split, a null-prototype
  // object is "nobody's instance" only by elimination — it lands here, not
  // in isPojo. Note this currently disagrees with the *other* isPojo (the
  // one actually wired into MoleculePolyatomic, at tool/(object)/pojo),
  // which treats null-prototype objects as POJOs. Both are intentional as
  // currently written — see tool/unknown/(object)/(notNull)/pojo's own
  // docstring — not a bug to silently reconcile.
  assert.equal(isInstance(Object.create(null) as object), true)
})

await test('isInstance rejects null', () => {
  assert.equal(isInstance(null), false)
})
