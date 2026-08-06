import assert from 'node:assert/strict'
import { test } from 'node:test'

import { isAtomUnion } from '../../src/tool/(molecule)/(atom)/union/is/function.js'

const typeGuard = {
  isAtom: (value: unknown): value is number => typeof value === 'number',
  isShorthand: (value: unknown): value is string => typeof value === 'string',
}

await test('isAtomUnion accepts an atom', () => {
  assert.equal(isAtomUnion(1, typeGuard), true)
})

await test('isAtomUnion accepts a shorthand', () => {
  assert.equal(isAtomUnion('shorthand', typeGuard), true)
})

await test('isAtomUnion rejects a value that is neither', () => {
  assert.equal(isAtomUnion(true, typeGuard), false)
})
