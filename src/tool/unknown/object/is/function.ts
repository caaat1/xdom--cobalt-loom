/**
 * Narrows on the raw `typeof value === 'object'` tag alone — which `null`
 * also carries, so the predicate says so honestly: `object | null`, not
 * `object`. Callers that need `null` excluded want `isObjectNotNull` instead.
 *
 * @see {@link ../../(object)/notNull/is/function.js}
 */
export function isObject(value: unknown): value is object | null {
  return typeof value === 'object'
}
