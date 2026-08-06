import assert from 'node:assert/strict'
import { test } from 'node:test'

import { traverseObjectProperty } from '../../src/tool/object/property/traverse/function.js'

await test('traverseObjectProperty visits every own enumerable string key and returns true', () => {
  const visited: (string | symbol)[] = []
  const result = traverseObjectProperty({
    obj: { a: 1, b: 2, c: 3 },
    option: undefined,
    visit: ({ key }) => {
      visited.push(key)
      return 'ok'
    },
  })
  assert.deepEqual(visited, ['a', 'b', 'c'])
  assert.equal(result, true)
})

await test('traverseObjectProperty stops immediately when visit returns abort', () => {
  const visited: (string | symbol)[] = []
  const result = traverseObjectProperty({
    obj: { a: 1, b: 2, c: 3 },
    option: undefined,
    visit: ({ key }) => {
      visited.push(key)
      return key === 'b' ? 'abort' : 'ok'
    },
  })
  assert.deepEqual(visited, ['a', 'b'])
  assert.equal(result, false)
})

await test('traverseObjectProperty continues past a key when visit returns skip', () => {
  const visited: (string | symbol)[] = []
  const result = traverseObjectProperty({
    obj: { a: 1, b: 2, c: 3 },
    option: undefined,
    visit: ({ key }) => {
      visited.push(key)
      return 'skip'
    },
  })
  assert.deepEqual(visited, ['a', 'b', 'c'])
  assert.equal(result, true)
})

await test('traverseObjectProperty ignores non-enumerable keys unless includeNonEnumerable is set', () => {
  const obj: { a: number; hidden?: number } = { a: 1 }
  Object.defineProperty(obj, 'hidden', { value: 2, enumerable: false })

  const defaultVisited: (string | symbol)[] = []
  traverseObjectProperty({
    obj,
    option: undefined,
    visit: ({ key }) => {
      defaultVisited.push(key)
      return 'ok'
    },
  })
  assert.deepEqual(defaultVisited, ['a'])

  const fullVisited: (string | symbol)[] = []
  traverseObjectProperty({
    obj,
    option: { includeNonEnumerable: true },
    visit: ({ key }) => {
      fullVisited.push(key)
      return 'ok'
    },
  })
  assert.deepEqual(fullVisited.sort(), ['a', 'hidden'])
})

await test('traverseObjectProperty ignores symbol keys unless includeSymbols is set', () => {
  const sym = Symbol('s')
  const obj = { a: 1, [sym]: 2 }

  const defaultVisited: (string | symbol)[] = []
  traverseObjectProperty({
    obj,
    option: undefined,
    visit: ({ key }) => {
      defaultVisited.push(key)
      return 'ok'
    },
  })
  assert.deepEqual(defaultVisited, ['a'])

  const fullVisited: (string | symbol)[] = []
  traverseObjectProperty({
    obj,
    option: { includeSymbols: true },
    visit: ({ key }) => {
      fullVisited.push(key)
      return 'ok'
    },
  })
  assert.deepEqual(fullVisited, ['a', sym])
})

await test('traverseObjectProperty readValue reads a data property lazily', () => {
  const values: unknown[] = []
  traverseObjectProperty({
    obj: { a: 'x', b: 'y' },
    option: undefined,
    visit: ({ readValue }) => {
      values.push(readValue())
      return 'ok'
    },
  })
  assert.deepEqual(values, ['x', 'y'])
})

await test('traverseObjectProperty readValue returns undefined for an accessor unless readAccessors is set', () => {
  const obj = {
    get a(): number {
      return 1
    },
  }

  let defaultValue: unknown
  traverseObjectProperty({
    obj,
    option: undefined,
    visit: ({ readValue }) => {
      defaultValue = readValue()
      return 'ok'
    },
  })
  assert.equal(defaultValue, undefined)

  let readAccessorsValue: unknown
  traverseObjectProperty({
    obj,
    option: { readAccessors: true },
    visit: ({ readValue }) => {
      readAccessorsValue = readValue()
      return 'ok'
    },
  })
  assert.equal(readAccessorsValue, 1)
})
