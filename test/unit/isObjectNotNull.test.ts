import assert from 'node:assert/strict'
import { test } from 'node:test'

import { isObjectNotNull } from '../../src/tool/unknown/(object)/notNull/is/function.js'

await test('isObjectNotNull accepts an object literal', () => {
  assert.equal(isObjectNotNull({}), true)
})

await test('isObjectNotNull accepts an array', () => {
  assert.equal(isObjectNotNull([]), true)
})

await test('isObjectNotNull rejects null', () => {
  assert.equal(isObjectNotNull(null), false)
})

await test('isObjectNotNull rejects a function', () => {
  assert.equal(
    isObjectNotNull(() => {}),
    false
  )
})

await test('isObjectNotNull rejects a primitive', () => {
  assert.equal(isObjectNotNull('a string'), false)
  assert.equal(isObjectNotNull(1), false)
  assert.equal(isObjectNotNull(undefined), false)
})
