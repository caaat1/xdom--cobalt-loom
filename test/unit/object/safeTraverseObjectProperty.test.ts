import assert from 'node:assert/strict'
import { test } from 'node:test'

import { traverseObjectSafe } from '../../../src/tool/object/(traverse)/safe/function.js'

await test('traverseObjectSafe is a no-op for null', () => {
  let calls = 0
  traverseObjectSafe({
    cb: () => {
      calls++
    },
    value: null,
  })
  assert.equal(calls, 0)
})

await test('traverseObjectSafe is a no-op for a primitive value', () => {
  let calls = 0
  traverseObjectSafe({
    cb: () => {
      calls++
    },
    value: 42,
  })
  assert.equal(calls, 0)
})

await test('traverseObjectSafe calls cb for every own data property', () => {
  const seen: [string | symbol, unknown][] = []
  traverseObjectSafe({
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

await test('traverseObjectSafe skips accessor properties by default', () => {
  const obj = {
    a: 1,
    get b(): number {
      return 2
    },
  }
  const seenKeys: (string | symbol)[] = []
  traverseObjectSafe({
    cb: ({ key }) => {
      seenKeys.push(key)
    },
    value: obj,
  })
  assert.deepEqual(seenKeys, ['a'])
})

await test('traverseObjectSafe calls cb for an accessor when readAccessors is true', () => {
  const obj = {
    a: 1,
    get b(): number {
      return 2
    },
  }
  const seen: [string | symbol, unknown][] = []
  traverseObjectSafe({
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

await test('traverseObjectSafe silently skips a property whose accessor throws', () => {
  const obj = {
    a: 1,
    get b(): number {
      throw new Error('boom')
    },
    c: 3,
  }
  const seenKeys: (string | symbol)[] = []
  assert.doesNotThrow(() => {
    traverseObjectSafe({
      cb: ({ key }) => {
        seenKeys.push(key)
      },
      option: { readAccessors: true },
      value: obj,
    })
  })
  assert.deepEqual(seenKeys, ['a', 'c'])
})
