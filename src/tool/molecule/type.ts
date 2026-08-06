import { isAtomUnion } from '../(molecule)/(atom)/union/is/function.js'
import type { AtomUnion } from '../(molecule)/(atom)/union/type.js'
import {
  type MoleculePolyatomic,
  isMoleculePolyatomic,
} from '../(molecule)/polyatomic/type.js'
import type { TypeDescription } from '../type/description/type.js'

export type Molecule<T_Atom, T_AtomShorthand> =
  | AtomUnion<T_Atom, T_AtomShorthand>
  | MoleculePolyatomic<T_Atom, T_AtomShorthand>
export function isMolecule<T_Atom, T_AtomShorthand>(
  molecule: unknown,
  typeGuard: {
    isAtom: (value: unknown) => value is T_Atom
    isAtomShorthand: (value: unknown) => value is T_AtomShorthand
  }
): molecule is Molecule<T_Atom, T_AtomShorthand> {
  const isValid =
    isAtomUnion(molecule, typeGuard) ||
    isMoleculePolyatomic(molecule, typeGuard)
  return isValid
}
export const typeDescription: TypeDescription = `Molecule is either an Atom, a shorthand for an Atom (AtomShorthand), a MoleculeArray, or a MoleculeMap.`
