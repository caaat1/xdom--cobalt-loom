import type { MoleculePathBound } from '../path/bound/type.js'
import type { Molecule } from '../type.js'

export type MoleculeBundle<T_Atom, T_AtomShorthand> = {
  molecule: Molecule<T_Atom, T_AtomShorthand>
} & MoleculePathBound
