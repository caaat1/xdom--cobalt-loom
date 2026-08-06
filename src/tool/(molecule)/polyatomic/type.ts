import type { MoleculePolyatomicArray } from '../(polyatomic)/array/type.js'
import type { MoleculePolyatomicMap } from '../(polyatomic)/map/type.js'
import { isPojo } from '../../(object)/pojo/is/function.js'
import { type Molecule, isMolecule } from '../../molecule/type.js'

export type MoleculePolyatomic<T_Atom, T_AtomShorthand> =
  | MoleculePolyatomicArray<T_Atom, T_AtomShorthand>
  | MoleculePolyatomicMap<T_Atom, T_AtomShorthand>
export function isMoleculePolyatomic<T_Atom, T_AtomShorthand>(
  molecule: unknown,
  typeGuard: {
    isAtom: (value: unknown) => value is T_Atom
    isAtomShorthand: (value: unknown) => value is T_AtomShorthand
  }
): molecule is MoleculePolyatomic<T_Atom, T_AtomShorthand> {
  const isValid: boolean =
    typeof molecule === 'object' &&
    molecule !== null &&
    (isPojo(molecule) || Array.isArray(molecule)) &&
    ((): boolean => {
      const objectValues = Object.values(molecule)
      return objectValues.every((v): v is Molecule<T_Atom, T_AtomShorthand> => {
        const result = isMolecule(v, typeGuard)
        return result
      })
    })()
  return isValid
}
export const typeDescription = `MoleculePolyatomic is a molecule that is either an array or an object, where all values are valid molecules (either atoms, atom shorthands, or nested polyatomics).`
