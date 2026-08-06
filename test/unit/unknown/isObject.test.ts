import assert from 'node:assert/strict'
import { test } from 'node:test'

import { isObject } from '../../../src/tool/unknown/object/is/function.js'

await test('isObject accepts an object literal', () => {
  assert.equal(isObject({}), true)
})

await test('isObject accepts an array', () => {
  assert.equal(isObject([]), true)
})

await test('isObject accepts null', () => {
  // typeof null === 'object' — this is the whole reason the predicate is
  // `value is object | null`, not `value is object`.
  assert.equal(isObject(null), true)
})

await test('isObject rejects a function', () => {
  // typeof gives functions their own 'function' tag.
  assert.equal(
    isObject(() => {}),
    false
  )
})

await test('isObject rejects a primitive', () => {
  assert.equal(isObject('a string'), false)
  assert.equal(isObject(1), false)
  assert.equal(isObject(undefined), false)
})
