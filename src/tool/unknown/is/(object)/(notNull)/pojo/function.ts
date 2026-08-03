import { isObjectNotNull } from '../../notNull/function.js'

/**
 * A plain old JavaScript object: `typeof`-object, not `null`, prototyped
 * directly on `Object.prototype` (object literals, `new Object()`).
 *
 * @remarks
 * Null-prototype objects (`Object.create(null)`) fail this check — by the
 * pojo/instance prototype split they land in `isInstance`.
 */
export function isPojo(obj: unknown): boolean {
  return isObjectNotNull(obj) && Object.getPrototypeOf(obj) === Object.prototype
}
