import { isAtomUnion } from '../../(molecule)/(atom)/union/is/function.js'
import { isMoleculePolyatomic } from '../../(molecule)/polyatomic/is/function.js'
import type { Molecule } from '../type.js'

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
