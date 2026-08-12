import { traverseObject } from '../../../../../object/traverse/function.js'
import type { TraverseObjectOption } from '../../../../../object/traverse/option/type.js'
import type { TraverseObjectVisitResult } from '../../../../../object/traverse/visit/result/type.js'
import { isObjectNotNull } from '../../../notNull/is/function.js'

/**
 * Safely determines whether `value` can be iterated as an object
 * (i.e. its own property keys can be retrieved and inspected).
 *
 * Options:
 * - `includeNonEnumerable` — use `Object.getOwnPropertyNames` instead of `Object.keys`.
 * - `includeSymbols` — include `Object.getOwnPropertySymbols` when checking.
 * - `requireValueAccess` — if `true`, also attempt to read every property value
 *   (may invoke getters); ANY read failure causes the function to return `false`.
 * - `readAccessors` — when `requireValueAccess` is `true`, permit invoking
 *   accessors; otherwise an accessor property causes the check to fail.
 */
export function isTraversable(
  value: unknown,
  option?: TraverseObjectOption & {
    /**
     * When `true`, attempt to read every property value.
     * Any failure (thrown getter / proxy trap) returns `false`.
     */
    requireValueAccess?: boolean
  }
): value is object {
  return (
    isObjectNotNull(value) &&
    traverseObject({
      obj: value,
      option,
      visit: ({ desc, key, readValue }): TraverseObjectVisitResult => {
        void key
        if (option?.requireValueAccess !== true) {
          return 'ok'
        }
        const isAccessor =
          desc !== undefined &&
          (desc.get !== undefined || desc.set !== undefined)
        // Accessor present but reading them is not allowed → object fails the check
        if (isAccessor && option?.readAccessors !== true) {
          return 'abort'
        }
        try {
          readValue()
        } catch {
          return 'abort'
        }
        return 'ok'
      },
    })
  )
}
