import { isPojo } from '../../(object)/pojo/is/function.js'
import { type Molecule, isMolecule } from '../type.js'

import type { MoleculePolyatomicArray } from './array/type.js'
import type { MoleculePolyatomicMap } from './map/type.js'

export type MoleculePolyatomic<T_Atom, T_Shorthand> =
  | MoleculePolyatomicArray<T_Atom, T_Shorthand>
  | MoleculePolyatomicMap<T_Atom, T_Shorthand>
export function isMoleculePolyatomic<T_Atom, T_Shorthand>(
  molecule: unknown,
  typeGuard: {
    isAtom: (value: unknown) => value is T_Atom
    isShorthand: (value: unknown) => value is T_Shorthand
  }
): molecule is MoleculePolyatomic<T_Atom, T_Shorthand> {
  const isValid: boolean =
    typeof molecule === 'object' &&
    molecule !== null &&
    (isPojo(molecule) || Array.isArray(molecule)) &&
    ((): boolean => {
      const objectValues = Object.values(molecule)
      return objectValues.every((v): v is Molecule<T_Atom, T_Shorthand> => {
        const result = isMolecule(v, typeGuard)
        return result
      })
    })()
  return isValid
}
export const typeDescription = `MoleculePolyatomic is a molecule that is either an array or an object, where all values are valid molecules (either atoms, shorthands, or nested polyatomics).`
