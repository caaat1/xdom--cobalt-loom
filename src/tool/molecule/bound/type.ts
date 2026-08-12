import type { Molecule } from '../type.js'

export type MoleculeBound<T_Atom, T_AtomShorthand> = {
  molecule: Molecule<T_Atom, T_AtomShorthand>
}
