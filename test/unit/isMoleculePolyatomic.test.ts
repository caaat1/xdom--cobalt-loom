import assert from 'node:assert/strict'
import { test } from 'node:test'

import { isMoleculePolyatomic } from '../../src/tool/(molecule)/polyatomic/type.js'

const typeGuard = {
  isAtom: (value: unknown): value is number => typeof value === 'number',
  isAtomShorthand: (value: unknown): value is string =>
    typeof value === 'string',
}

await test('isMoleculePolyatomic accepts an array of valid molecules', () => {
  assert.equal(isMoleculePolyatomic([1, 'two', 1], typeGuard), true)
})

await test('isMoleculePolyatomic accepts a plain object of valid molecules', () => {
  assert.equal(isMoleculePolyatomic({ a: 1, b: 'two' }, typeGuard), true)
})

await test('isMoleculePolyatomic rejects an array containing an invalid molecule', () => {
  assert.equal(isMoleculePolyatomic([1, true], typeGuard), false)
})

await test('isMoleculePolyatomic rejects null', () => {
  assert.equal(isMoleculePolyatomic(null, typeGuard), false)
})

await test('isMoleculePolyatomic rejects a non-plain object', () => {
  assert.equal(isMoleculePolyatomic(new Map(), typeGuard), false)
})
