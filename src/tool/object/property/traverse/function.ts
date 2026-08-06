// ─── Internal Traversal Core ──────────────────────────────────────────────────
import type { ObjectPropertyTraverseOption } from './option/type.js'
import type { ObjectPropertyTraverseVisit } from './visit/type.js'
/**
 * Shared traversal core used by both `safeIterateFields` and `isTraversable`.
 *
 * Iterates over every key on `obj`, resolving its descriptor and optionally its
 * value, then calls `visit` for each one.
 *
 * @returns `true` if traversal completed without issues, `false` if a hard
 *          error (e.g. on a proxy/host object) makes the object un-traversable.
 *
 * The `visit` callback returns:
 *  - `'skip'`  — skip this key and move on
 *  - `'abort'` — stop the whole traversal and return `false`
 *  - `'ok'`    — continue normally
 */
export function traverseObjectProperty({
  obj,
  option,
  visit,
}: {
  obj: object
  option: ObjectPropertyTraverseOption | undefined
  visit: ObjectPropertyTraverseVisit
}): boolean {
  // ── 1. Collect string keys ────────────────────────────────────────────────
  let names: string[]
  try {
    names =
      option?.includeNonEnumerable === true
        ? Object.getOwnPropertyNames(obj)
        : Object.keys(obj)
  } catch {
    return false
  }
  // ── 2. Collect symbol keys ────────────────────────────────────────────────
  let symbols: symbol[] = []
  if (option?.includeSymbols === true) {
    try {
      symbols = Object.getOwnPropertySymbols(obj)
    } catch {
      return false
    }
  }
  // ── 3. Walk every key ─────────────────────────────────────────────────────
  for (const key of [...names, ...symbols]) {
    let desc: PropertyDescriptor | undefined
    try {
      desc = Object.getOwnPropertyDescriptor(obj, key)
    } catch {
      // descriptor retrieval can throw on some host objects/proxies
      const r = visit({
        desc: undefined,
        key,
        readValue: (): unknown => undefined,
      })
      if (r === 'abort') {
        return false
      }
      continue
    }
    const isAccessor =
      desc !== undefined && (desc.get !== undefined || desc.set !== undefined)
    /**
     * Lazily reads the property value, respecting the `readAccessors` option.
     * Returns `undefined` for accessors when reading is not allowed; callers
     * must handle that case explicitly if they need the value.
     */
    const readValue = (): unknown => {
      if (isAccessor && option?.readAccessors !== true) {
        return undefined
      }
      return obj[key as keyof typeof obj]
    }
    const result = visit({ desc, key, readValue })
    if (result === 'abort') {
      return false
    }
  }
  return true
}
