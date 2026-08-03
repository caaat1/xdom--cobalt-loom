import type { TypeDescription } from '../../type/description/type.js'
import { isAtomUnion } from '../atom/union/type.js'
import { MoleculeBundleArray } from '../bundle/array/class.js'
import type { MoleculeBundle } from '../bundle/type.js'
import type { MoleculeEntryArray } from '../entry/array/type.js'
import type { MoleculeEntry } from '../entry/type.js'
import type { MoleculePath } from '../path/type.js'
import { isMoleculePolyatomic } from '../polyatomic/type.js'
import { MoleculeTypeError } from '../type/error.js'
import type { Molecule } from '../type.js'

import type { HandleMethodParam } from './handle/param/type.js'

export class MoleculeTraverser<T_Atom, T_Shorthand, T_StaticData> {
  readonly traverse: <T extends T_StaticData>(param: {
    molecule: Molecule<T_Atom, T_Shorthand>
    staticData: T
  }) => void
  readonly #pushMolecule = ({
    entries,
    moleculePath,
    stack,
  }: {
    entries: MoleculeEntryArray<T_Atom, T_Shorthand>
    moleculePath: MoleculePath
    stack: MoleculeBundleArray<T_Atom, T_Shorthand>
  }): void => {
    entries
      .reverse()
      .forEach(
        ([key, molecule]: MoleculeEntry<T_Atom, T_Shorthand>): number => {
          return stack.push({
            molecule,
            moleculePath: [...moleculePath, key],
          })
        }
      )
  }
  constructor({
    expectedType,
    typeGuard,
    castToAtom,
    handle,
  }: {
    expectedType: TypeDescription
    typeGuard: {
      isAtom: (molecule: unknown) => molecule is T_Atom
      isShorthand: (molecule: unknown) => molecule is T_Shorthand
    }
    castToAtom: (shorthand: T_Shorthand) => T_Atom
    handle: <T extends T_StaticData>(
      param: HandleMethodParam<T_Atom, T>
    ) => void
  }) {
    this.traverse = <T extends T_StaticData>({
      molecule,
      staticData,
    }: {
      molecule: Molecule<T_Atom, T_Shorthand>
      staticData: T
    }): void => {
      const stack: MoleculeBundleArray<T_Atom, T_Shorthand> =
        new MoleculeBundleArray()
      let stackItem: MoleculeBundle<T_Atom, T_Shorthand> | undefined = {
        molecule,
        moleculePath: [],
      }
      do {
        const { molecule, moleculePath }: MoleculeBundle<T_Atom, T_Shorthand> =
          stackItem
        if (isAtomUnion(molecule, typeGuard)) {
          const atom: T_Atom = typeGuard.isShorthand(molecule)
            ? castToAtom(molecule)
            : molecule
          handle<T>({
            atom,
            moleculePath,
            staticData,
          })
        } else if (isMoleculePolyatomic(molecule, typeGuard)) {
          const entries: MoleculeEntryArray<T_Atom, T_Shorthand> =
            Object.entries(molecule)
          this.#pushMolecule({ entries, moleculePath, stack })
        } else {
          throw new MoleculeTypeError({
            expectedType,
            moleculeBundle: { molecule, moleculePath },
          })
        }
        stackItem = stack.pop()
      } while (stackItem !== undefined)
    }
  }
}
