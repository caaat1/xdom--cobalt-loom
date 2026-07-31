import assert from 'node:assert/strict'
import { test } from 'node:test'

import { isPojo } from '../../src/tool/(object)/pojo/is/function.js'

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

await test('isPojo accepts a null-prototype object', () => {
  assert.equal(isPojo(Object.create(null) as object), true)
})
