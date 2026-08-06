import assert from 'node:assert/strict'
import { test } from 'node:test'

import { isTraversable } from '../../../src/tool/unknown/(object)/(notNull)/traversable/is/function.js'

await test('isTraversable rejects null', () => {
  assert.equal(isTraversable(null), false)
})

await test('isTraversable rejects a primitive', () => {
  assert.equal(isTraversable(42), false)
})

await test('isTraversable accepts a plain object without requireValueAccess', () => {
  assert.equal(isTraversable({ a: 1 }), true)
})

await test('isTraversable accepts an array', () => {
  assert.equal(isTraversable([1, 2, 3]), true)
})

await test('isTraversable with requireValueAccess accepts an object whose properties all read cleanly', () => {
  assert.equal(
    isTraversable({ a: 1, b: 2 }, { requireValueAccess: true }),
    true
  )
})

await test('isTraversable with requireValueAccess rejects an accessor property when readAccessors is not set', () => {
  const obj = {
    get a(): number {
      return 1
    },
  }
  assert.equal(isTraversable(obj, { requireValueAccess: true }), false)
})

await test('isTraversable with requireValueAccess and readAccessors accepts a well-behaved accessor', () => {
  const obj = {
    get a(): number {
      return 1
    },
  }
  assert.equal(
    isTraversable(obj, { requireValueAccess: true, readAccessors: true }),
    true
  )
})

await test('isTraversable with requireValueAccess and readAccessors rejects a throwing accessor', () => {
  const obj = {
    get a(): number {
      throw new Error('boom')
    },
  }
  assert.equal(
    isTraversable(obj, { requireValueAccess: true, readAccessors: true }),
    false
  )
})
