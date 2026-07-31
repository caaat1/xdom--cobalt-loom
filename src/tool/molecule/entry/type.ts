import type { Molecule } from '../type.js'

import type { MoleculeEntryKey } from './key/type.js'

export type MoleculeEntry<T_Atom, T_Shorthand> = [
  MoleculeEntryKey,
  Molecule<T_Atom, T_Shorthand>,
]
