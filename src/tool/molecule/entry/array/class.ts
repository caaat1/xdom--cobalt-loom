import type { MoleculeEntry } from '../type.js'

export class MoleculeEntryArray<T_Atom, T_AtomShorthand> extends Array<
  MoleculeEntry<T_Atom, T_AtomShorthand>
> {}
