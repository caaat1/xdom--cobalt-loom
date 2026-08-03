/**
 * The implementation read aloud: `typeof value` is `'object'`, and the value
 * is not `null`. Functions fail — they answer `typeof` with `'function'` —
 * unlike in the spec/TypeScript sense checked by `isNonPrimitive`
 * (`../../nonPrimitive/function.js`); functions are the two predicates' only
 * disagreement.
 *
 * @remarks
 * The narrowing is `value is object` — sound but wider than the runtime set,
 * since TypeScript cannot express "object minus functions" (`object` is not
 * a union, so `Exclude` has nothing to distribute over).
 */
export function isObjectNotNull(value: unknown): value is object {
  return typeof value === 'object' && value !== null
}
