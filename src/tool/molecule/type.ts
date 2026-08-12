import type { AtomUnion } from '../(molecule)/(atom)/union/type.js'
import { type MoleculePolyatomic } from '../(molecule)/polyatomic/type.js'

export type Molecule<T_Atom, T_AtomShorthand> =
  | AtomUnion<T_Atom, T_AtomShorthand>
  | MoleculePolyatomic<T_Atom, T_AtomShorthand>
