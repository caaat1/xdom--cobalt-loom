import assert from 'node:assert/strict'
import { test } from 'node:test'

import { isAmong } from '../../src/tool/unknown/among/is/function.js'

await test('isAmong accepts a value present in the list', () => {
  assert.equal(isAmong('b', ['a', 'b', 'c']), true)
})

await test('isAmong rejects a value absent from the list', () => {
  assert.equal(isAmong('d', ['a', 'b', 'c']), false)
})

await test('isAmong compares objects by reference, not shape', () => {
  assert.equal(isAmong({}, [{}]), false)
})

await test('isAmong finds NaN via SameValueZero', () => {
  // Array.prototype.includes (unlike indexOf/===) treats NaN as findable.
  assert.equal(isAmong(Number.NaN, [Number.NaN]), true)
})
