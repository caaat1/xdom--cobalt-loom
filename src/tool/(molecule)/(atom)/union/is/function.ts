import type { AtomUnion } from '../type.js'

export function isAtomUnion<T_Atom, T_AtomShorthand>(
  value: unknown,
  typeGuard: {
    isAtom: (value: unknown) => value is T_Atom
    isAtomShorthand: (value: unknown) => value is T_AtomShorthand
  }
): value is AtomUnion<T_Atom, T_AtomShorthand> {
  const isValid = typeGuard.isAtom(value) || typeGuard.isAtomShorthand(value)
  return isValid
}
