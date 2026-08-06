import assert from 'node:assert/strict'
import { test } from 'node:test'

import { isNonPrimitive } from '../../src/tool/unknown/nonPrimitive/is/function.js'

await test('isNonPrimitive accepts an object literal', () => {
  assert.equal(isNonPrimitive({}), true)
})

await test('isNonPrimitive accepts an array', () => {
  assert.equal(isNonPrimitive([]), true)
})

await test('isNonPrimitive accepts a function', () => {
  // Unlike isObject, isNonPrimitive folds functions in — they're not one
  // of the seven primitive types, despite typeof tagging them separately.
  assert.equal(
    isNonPrimitive(() => {}),
    true
  )
})

await test('isNonPrimitive rejects null', () => {
  assert.equal(isNonPrimitive(null), false)
})

await test('isNonPrimitive rejects a primitive', () => {
  assert.equal(isNonPrimitive('a string'), false)
  assert.equal(isNonPrimitive(1), false)
  assert.equal(isNonPrimitive(undefined), false)
})
