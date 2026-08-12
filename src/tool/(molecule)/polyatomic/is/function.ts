import { isPojo } from '../../../(object)/pojo/is/function.js'
import { isMolecule } from '../../../molecule/is/function.js'
import { type Molecule } from '../../../molecule/type.js'
import type { MoleculePolyatomic } from '../type.js'

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
