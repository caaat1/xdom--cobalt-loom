import type { AtomUnion } from '../type.js'

export function isAtomUnion<T_Atom, T_Shorthand>(
  value: unknown,
  typeGuard: {
    isAtom: (value: unknown) => value is T_Atom
    isShorthand: (value: unknown) => value is T_Shorthand
  }
): value is AtomUnion<T_Atom, T_Shorthand> {
  const isValid = typeGuard.isAtom(value) || typeGuard.isShorthand(value)
  return isValid
}
