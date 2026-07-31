import type { TypeDescription } from '../type/description/type.js'

import { type AtomUnion, isAtomUnion } from './atom/union/type.js'
import {
  type MoleculePolyatomic,
  isMoleculePolyatomic,
} from './polyatomic/type.js'

export type Molecule<T_Atom, T_Shorthand> =
  AtomUnion<T_Atom, T_Shorthand> | MoleculePolyatomic<T_Atom, T_Shorthand>
export function isMolecule<T_Atom, T_Shorthand>(
  molecule: unknown,
  typeGuard: {
    isAtom: (value: unknown) => value is T_Atom
    isShorthand: (value: unknown) => value is T_Shorthand
  }
): molecule is Molecule<T_Atom, T_Shorthand> {
  const isValid =
    isAtomUnion(molecule, typeGuard) ||
    isMoleculePolyatomic(molecule, typeGuard)
  return isValid
}
export const typeDescription: TypeDescription = `Molecule is either an Atom, a Shorthand for an Atom, a MoleculeArray, or a MoleculeMap.`
