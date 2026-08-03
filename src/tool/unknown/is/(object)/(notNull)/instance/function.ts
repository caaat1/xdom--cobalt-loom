import { isObjectNotNull } from '../../notNull/function.js'

/**
 * A `typeof`-object, non-`null` value prototyped on anything other than
 * `Object.prototype`: class/constructor instances, arrays, dates, and — by
 * elimination in the pojo/instance prototype split — null-prototype objects
 * (`Object.create(null)`), which are nobody's instance.
 */
export function isInstance(obj: unknown): boolean {
  return isObjectNotNull(obj) && Object.getPrototypeOf(obj) !== Object.prototype
}
