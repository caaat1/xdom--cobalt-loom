import type { Molecule } from '../../../molecule/type.js'

import type { MoleculePolyatomicMapKey } from './key/type.js'

export type MoleculePolyatomicMap<T_Atom, T_AtomShorthand> = {
  [key: MoleculePolyatomicMapKey]: Molecule<T_Atom, T_AtomShorthand>
}
