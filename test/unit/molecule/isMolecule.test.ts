import assert from 'node:assert/strict'
import { test } from 'node:test'

import { isMolecule } from '../../../src/tool/molecule/type.js'

const typeGuard = {
  isAtom: (value: unknown): value is number => typeof value === 'number',
  isAtomShorthand: (value: unknown): value is string =>
    typeof value === 'string',
}

await test('isMolecule accepts a bare atom', () => {
  assert.equal(isMolecule(1, typeGuard), true)
})

await test('isMolecule accepts a polyatomic array', () => {
  assert.equal(isMolecule([1, 'two'], typeGuard), true)
})

await test('isMolecule accepts a polyatomic map', () => {
  assert.equal(isMolecule({ a: 1, b: 'two' }, typeGuard), true)
})

await test('isMolecule rejects a value that is neither an atom nor polyatomic', () => {
  assert.equal(isMolecule(true, typeGuard), false)
})
