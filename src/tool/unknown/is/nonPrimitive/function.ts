import { isObjectNotNull } from '../(object)/notNull/function.js'

/**
 * Narrows to TypeScript's `object` type: anything that is not one of the
 * seven primitives (`string`, `number`, `bigint`, `boolean`, `symbol`,
 * `undefined`, `null`). Notably, functions pass — despite `typeof` giving
 * them their own tag — and `null` fails despite `typeof null === 'object'`.
 */
export function isNonPrimitive(value: unknown): value is object {
  return isObjectNotNull(value) || typeof value === 'function'
}
