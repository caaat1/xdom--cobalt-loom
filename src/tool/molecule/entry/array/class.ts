import type { MoleculeEntry } from '../type.js'

export class MoleculeEntryArray<T_Atom, T_Shorthand> extends Array<
  MoleculeEntry<T_Atom, T_Shorthand>
> {}
