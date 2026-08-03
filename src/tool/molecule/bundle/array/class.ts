import type { MoleculeBundle } from '../type.js'

export class MoleculeBundleArray<T_Atom, T_Shorthand> extends Array<
  MoleculeBundle<T_Atom, T_Shorthand>
> {}
