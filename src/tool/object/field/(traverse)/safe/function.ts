// ─── Public API ───────────────────────────────────────────────────────────────
import { isObjectNotNull } from '@/tool/unknown/is/(object)/notNull/function.js'

import { traverse } from '../../traverse/function.js'
import type { Option } from '../../traverse/option/type.js'
import type { VisitResult } from '../../traverse/visit/result/type.js'

import type { Cb } from './cb/type.js'
/**
 * Iterates over all own property keys of `value`, calling `cb` for each one
 * whose value can be safely read.
 *
 * - Accessor properties are skipped unless `readAccessors: true`.
 * - Keys whose descriptor or value cannot be read are silently skipped.
 * - `null` / `undefined` / primitives are no-ops.
 */
export function traverseSafe({
  cb,
  option,
  value,
}: {
  cb: Cb
  option?: Option & {
    /** When `false` (default) accessor properties are skipped entirely. */
    readAccessors?: false | true
  }
  value: unknown
}): void {
  if (isObjectNotNull(value) === false) {
    return
  }
  traverse({
    obj: value,
    option,
    visit: ({ desc, key, readValue }): VisitResult => {
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
