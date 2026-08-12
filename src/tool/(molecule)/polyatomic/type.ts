import type { MoleculePolyatomicArray } from '../(polyatomic)/array/type.js'
import type { MoleculePolyatomicMap } from '../(polyatomic)/map/type.js'

export type MoleculePolyatomic<T_Atom, T_AtomShorthand> =
  | MoleculePolyatomicArray<T_Atom, T_AtomShorthand>
  | MoleculePolyatomicMap<T_Atom, T_AtomShorthand>
