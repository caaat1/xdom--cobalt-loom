import type { MoleculePathBound } from '../../../molecule/path/bound/type.js'

/**
 * @see {@link ./-alt/type.js} — a tuple-shaped alternative to this
 * object-shaped bundle; pick whichever destructures more naturally at the
 * call site.
 */
export type AtomBundle<T_Atom> = {
  atom: T_Atom
} & MoleculePathBound
