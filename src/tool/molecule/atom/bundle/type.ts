import type { MoleculePathBound } from '../../path/bound/type.js'
// Consider using "src/tool/molecule/atom/bundle/alt/type.ts" instead
export type AtomBundle<T_Atom> = {
  atom: T_Atom
} & MoleculePathBound
