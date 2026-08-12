import { isAtomUnion } from '../../(molecule)/(atom)/union/is/function.js'
import { isMoleculePolyatomic } from '../../(molecule)/polyatomic/is/function.js'
import type { TypeDescription } from '../../type/description/type.js'
import { MoleculeBundleArray } from '../bundle/array/class.js'
import type { MoleculeBundle } from '../bundle/type.js'
import type { MoleculeEntryArray } from '../entry/array/type.js'
import type { MoleculeEntry } from '../entry/type.js'
import type { MoleculePath } from '../path/type.js'
import { MoleculeTypeError } from '../type/error.js'
import type { Molecule } from '../type.js'

import type { TraverserHandleParam } from './handle/param/type.js'

export class MoleculeTraverser<T_Atom, T_AtomShorthand, T_StaticData> {
  readonly traverse: <T extends T_StaticData>(param: {
    molecule: Molecule<T_Atom, T_AtomShorthand>
    staticData: T
  }) => void
  readonly #pushMolecule = ({
    entries,
    moleculePath,
    stack,
  }: {
    entries: MoleculeEntryArray<T_Atom, T_AtomShorthand>
    moleculePath: MoleculePath
    stack: MoleculeBundleArray<T_Atom, T_AtomShorthand>
  }): void => {
    entries
      .reverse()
      .forEach(
        ([key, molecule]: MoleculeEntry<T_Atom, T_AtomShorthand>): number => {
          return stack.push({
            molecule,
            moleculePath: [...moleculePath, key],
          })
        }
      )
  }
  constructor({
    castToAtom,
    handle,
    typeExpected,
    typeGuard,
  }: {
    castToAtom: (atomShorthand: T_AtomShorthand) => T_Atom
    handle: <T extends T_StaticData>(
      param: TraverserHandleParam<T_Atom, T>
    ) => void
    typeExpected: TypeDescription
    typeGuard: {
      isAtom: (molecule: unknown) => molecule is T_Atom
      isAtomShorthand: (molecule: unknown) => molecule is T_AtomShorthand
    }
  }) {
    this.traverse = <T extends T_StaticData>({
      molecule,
      staticData,
    }: {
      molecule: Molecule<T_Atom, T_AtomShorthand>
      staticData: T
    }): void => {
      const stack: MoleculeBundleArray<T_Atom, T_AtomShorthand> =
        new MoleculeBundleArray()
      let stackItem: MoleculeBundle<T_Atom, T_AtomShorthand> | undefined = {
        molecule,
        moleculePath: [],
      }
      do {
        const {
          molecule,
          moleculePath,
        }: MoleculeBundle<T_Atom, T_AtomShorthand> = stackItem
        if (isAtomUnion(molecule, typeGuard)) {
          const atom: T_Atom = typeGuard.isAtomShorthand(molecule)
            ? castToAtom(molecule)
            : molecule
          handle<T>({
            atom,
            moleculePath,
            staticData,
          })
        } else if (isMoleculePolyatomic(molecule, typeGuard)) {
          const entries: MoleculeEntryArray<T_Atom, T_AtomShorthand> =
            Object.entries(molecule)
          this.#pushMolecule({ entries, moleculePath, stack })
        } else {
          throw new MoleculeTypeError({
            typeExpected,
            moleculeBundle: { molecule, moleculePath },
          })
        }
        stackItem = stack.pop()
      } while (stackItem !== undefined)
    }
  }
}
