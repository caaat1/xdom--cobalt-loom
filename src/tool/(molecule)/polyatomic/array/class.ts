import type { Molecule } from '../../../molecule/type.js'

export class MoleculePolyatomicArray<T_Atom, T_Shorthand> extends Array<
  Molecule<T_Atom, T_Shorthand>
> {}
