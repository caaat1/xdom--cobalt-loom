import assert from 'node:assert/strict'
import { test } from 'node:test'

import { safeTraverseObjectProperty } from '../../src/tool/object/property/(traverse)/safe/function.js'

await test('safeTraverseObjectProperty is a no-op for null', () => {
  let calls = 0
  safeTraverseObjectProperty({
    cb: () => {
      calls++
    },
    value: null,
  })
  assert.equal(calls, 0)
})

await test('safeTraverseObjectProperty is a no-op for a primitive value', () => {
  let calls = 0
  safeTraverseObjectProperty({
    cb: () => {
      calls++
    },
    value: 42,
  })
  assert.equal(calls, 0)
})

await test('safeTraverseObjectProperty calls cb for every own data property', () => {
  const seen: [string | symbol, unknown][] = []
  safeTraverseObjectProperty({
    cb: ({ key, value }) => {
      seen.push([key, value])
    },
    value: { a: 1, b: 2 },
  })
  assert.deepEqual(seen, [
    ['a', 1],
    ['b', 2],
  ])
})

await test('safeTraverseObjectProperty skips accessor properties by default', () => {
  const obj = {
    a: 1,
    get b(): number {
      return 2
    },
  }
  const seenKeys: (string | symbol)[] = []
  safeTraverseObjectProperty({
    cb: ({ key }) => {
      seenKeys.push(key)
    },
    value: obj,
  })
  assert.deepEqual(seenKeys, ['a'])
})

await test('safeTraverseObjectProperty calls cb for an accessor when readAccessors is true', () => {
  const obj = {
    a: 1,
    get b(): number {
      return 2
    },
  }
  const seen: [string | symbol, unknown][] = []
  safeTraverseObjectProperty({
    cb: ({ key, value }) => {
      seen.push([key, value])
    },
    option: { readAccessors: true },
    value: obj,
  })
  assert.deepEqual(seen, [
    ['a', 1],
    ['b', 2],
  ])
})

await test('safeTraverseObjectProperty silently skips a property whose accessor throws', () => {
  const obj = {
    a: 1,
    get b(): number {
      throw new Error('boom')
    },
    c: 3,
  }
  const seenKeys: (string | symbol)[] = []
  assert.doesNotThrow(() => {
    safeTraverseObjectProperty({
      cb: ({ key }) => {
        seenKeys.push(key)
      },
      option: { readAccessors: true },
      value: obj,
    })
  })
  assert.deepEqual(seenKeys, ['a', 'c'])
})
