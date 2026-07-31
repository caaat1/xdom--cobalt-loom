import type { TypeDescription } from '../../../type/description/type.js'

export const typeDescription: TypeDescription = `AtomUnion is either an Atom or a Shorthand for an Atom.`
export type AtomUnion<T_Atom, T_Shorthand> = T_Atom | T_Shorthand
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
