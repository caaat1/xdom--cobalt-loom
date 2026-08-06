import assert from 'node:assert/strict'
import { test } from 'node:test'

import { isPojo } from '../../src/tool/unknown/(object)/(notNull)/pojo/is/function.js'

// Not the same isPojo as test/unit/isPojo.test.ts — that one covers
// tool/(object)/pojo (the one actually wired into MoleculePolyatomic),
// which takes an already-narrowed `object` and treats a null-prototype
// object as a POJO. This isPojo takes `unknown` and, by design, excludes
// null-prototype objects — they belong to isInstance instead, as part of
// this module's own pojo/instance prototype split. See isInstance.test.ts.

await test('isPojo accepts an object literal', () => {
  assert.equal(isPojo({}), true)
})

await test('isPojo rejects an array', () => {
  assert.equal(isPojo([]), false)
})

await test('isPojo rejects a class instance', () => {
  class Foo {}
  assert.equal(isPojo(new Foo()), false)
})

await test('isPojo rejects a null-prototype object', () => {
  assert.equal(isPojo(Object.create(null) as object), false)
})

await test('isPojo rejects null', () => {
  assert.equal(isPojo(null), false)
})
