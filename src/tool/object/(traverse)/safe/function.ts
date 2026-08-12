// ─── Public API ───────────────────────────────────────────────────────────────

import { isObjectNotNull } from '../../../unknown/(object)/notNull/is/function.js'
import { traverseObject } from '../../traverse/function.js'
import type { TraverseObjectOption } from '../../traverse/option/type.js'
import type { TraverseObjectVisitResult } from '../../traverse/visit/result/type.js'

import type { TraverseObjectSafeCb } from './cb/type.js'
/**
 * Iterates over all own property keys of `value`, calling `cb` for each one
 * whose value can be safely read.
 *
 * - Accessor properties are skipped unless `readAccessors: true`.
 * - Keys whose descriptor or value cannot be read are silently skipped.
 * - `null` / `undefined` / primitives are no-ops.
 */
export function traverseObjectSafe({
  cb,
  option,
  value,
}: {
  cb: TraverseObjectSafeCb
  option?: TraverseObjectOption & {
    /** When `false` (default) accessor properties are skipped entirely. */
    readAccessors?: false | true
  }
  value: unknown
}): void {
  if (isObjectNotNull(value) === false) {
    return
  }
  traverseObject({
    obj: value,
    option,
    visit: ({ desc, key, readValue }): TraverseObjectVisitResult => {
      // Skip accessors unless explicitly allowed
      const isAccessor =
        desc !== undefined && (desc.get !== undefined || desc.set !== undefined)
      if (isAccessor && option?.readAccessors !== true) {
        return 'skip'
      }
      let value: unknown
      try {
        value = readValue()
      } catch {
        return 'skip'
      }
      cb({ desc, key, value })
      return 'ok'
    },
  })
}
