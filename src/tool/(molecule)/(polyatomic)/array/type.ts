import type { Molecule } from '../../../molecule/type.js'

export type MoleculePolyatomicArray<T_Atom, T_AtomShorthand> = Molecule<
  T_Atom,
  T_AtomShorthand
>[]
