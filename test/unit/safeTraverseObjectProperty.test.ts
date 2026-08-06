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
    value: 'not an object',
  })
  assert.equal(calls, 0)
})

await test('safeTraverseObjectProperty calls cb for every own data property', () => {
  const seen: [string | symbol, unknown][] = []
  safeTraverseObjectProperty({
    cb: ({ key, value }) => {
      seen.push([key, value])
    },
    value: { a: 'x', b: 'y' },
  })
  assert.deepEqual(seen, [
    ['a', 'x'],
    ['b', 'y'],
  ])
})

await test('safeTraverseObjectProperty skips accessor properties by default', () => {
  const obj = {
    a: 'x',
    get b(): string {
      return 'y'
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
    a: 'x',
    get b(): string {
      return 'y'
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
    ['a', 'x'],
    ['b', 'y'],
  ])
})

await test('safeTraverseObjectProperty silently skips a property whose accessor throws', () => {
  const obj = {
    a: 'x',
    get b(): string {
      throw new Error('boom')
    },
    c: 'z',
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
