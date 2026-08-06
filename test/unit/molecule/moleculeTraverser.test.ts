import assert from 'node:assert/strict'
import { test } from 'node:test'

import { MoleculeTraverser } from '../../../src/tool/molecule/traverser/class.js'
import { MoleculeTypeError } from '../../../src/tool/molecule/type/error.js'

// Atoms are numbers, atom shorthands are strings; a shorthand casts to its
// own length so a shorthand-derived atom is distinguishable from a bare one
// in assertions below.
const typeGuard = {
  isAtom: (value: unknown): value is number => typeof value === 'number',
  isAtomShorthand: (value: unknown): value is string =>
    typeof value === 'string',
}
const castToAtom = (atomShorthand: string): number => atomShorthand.length

function makeTraverser(
  handle: (param: {
    atom: number
    moleculePath: string[]
    staticData: unknown
  }) => void
): MoleculeTraverser<number, string, unknown> {
  return new MoleculeTraverser({
    castToAtom,
    expectedType: 'a test molecule',
    handle,
    typeGuard,
  })
}

await test('MoleculeTraverser calls handle for a bare atom at the root', () => {
  const calls: unknown[] = []
  makeTraverser((param) => calls.push(param)).traverse({
    molecule: 5,
    staticData: 'root',
  })
  assert.deepEqual(calls, [{ atom: 5, moleculePath: [], staticData: 'root' }])
})

await test('MoleculeTraverser converts a shorthand atom via castToAtom before calling handle', () => {
  const calls: unknown[] = []
  makeTraverser((param) => calls.push(param)).traverse({
    molecule: 'ab',
    staticData: 'root',
  })
  assert.deepEqual(calls, [{ atom: 2, moleculePath: [], staticData: 'root' }])
})

await test('MoleculeTraverser recurses into a polyatomic array, tracking index paths in order', () => {
  const calls: unknown[] = []
  makeTraverser((param) => calls.push(param)).traverse({
    molecule: [1, 'ab', 3],
    staticData: undefined,
  })
  assert.deepEqual(calls, [
    { atom: 1, moleculePath: ['0'], staticData: undefined },
    { atom: 2, moleculePath: ['1'], staticData: undefined },
    { atom: 3, moleculePath: ['2'], staticData: undefined },
  ])
})

await test('MoleculeTraverser recurses into a polyatomic map, tracking key paths in order', () => {
  const calls: unknown[] = []
  makeTraverser((param) => calls.push(param)).traverse({
    molecule: { x: 1, y: 'ab' },
    staticData: undefined,
  })
  assert.deepEqual(calls, [
    { atom: 1, moleculePath: ['x'], staticData: undefined },
    { atom: 2, moleculePath: ['y'], staticData: undefined },
  ])
})

await test('MoleculeTraverser recurses through nested polyatomic structures, building the full path', () => {
  const calls: unknown[] = []
  makeTraverser((param) => calls.push(param)).traverse({
    molecule: { a: [1, { b: 'ab' }] },
    staticData: undefined,
  })
  assert.deepEqual(calls, [
    { atom: 1, moleculePath: ['a', '0'], staticData: undefined },
    { atom: 2, moleculePath: ['a', '1', 'b'], staticData: undefined },
  ])
})

await test('MoleculeTraverser throws MoleculeTypeError for a value that is neither atom, shorthand, nor polyatomic', () => {
  assert.throws(() => {
    makeTraverser(() => {}).traverse({
      // Deliberately not a valid Molecule<number, string> — traverse()
      // trusts its caller's typing, so exercising the runtime guard against
      // a genuinely invalid value needs a cast past that trust.
      molecule: true as unknown as number,
      staticData: undefined,
    })
  }, MoleculeTypeError)
})
