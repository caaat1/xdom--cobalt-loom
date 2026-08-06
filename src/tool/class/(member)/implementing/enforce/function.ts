import { ownImplementingSet } from '../register/function.js'

/**
 * Class decorator factory that enforces a named contract's coverage:
 * `requiredKeys` is a runtime mirror of the interface/type's member names —
 * the interface itself is fully erased by the time this runs, so there is no
 * way to read its member list back from the type system, and this list is
 * the (manually maintained) source of truth `@implementMethod(contractName)`
 * / `@implementProperty(contractName)` markers are checked against.
 *
 * Coverage is collected across the WHOLE chain, unlike `enforceFinal`/
 * `enforceBacking`: a member marked on an ancestor class genuinely satisfies
 * the contract for every subclass that inherits it without overriding it, so
 * `enforceImplementing` walks from `Ctor` up through its ancestors and unions
 * each level's own registry for `contractName` before comparing.
 *
 * Throws on either direction of mismatch: a required key with no marked
 * member anywhere in the chain (missing implementation — typically a typo'd
 * `contractName` or a genuinely forgotten member), or a marked member whose
 * name isn't in `requiredKeys` (stale marker, usually left behind after the
 * contract's member list changed).
 */
export function enforceImplementing<
  T extends { new (...args: unknown[]): unknown },
>(
  contractName: string,
  requiredKeys: readonly (string | symbol)[]
): (Ctor: T) => T {
  return (Ctor: T): T => {
    const covered = new Set<string | symbol>()
    let ctor: object | null = Ctor
    while (ctor !== null && ctor !== Function.prototype) {
      const own = ownImplementingSet(ctor, contractName)
      if (own !== undefined) {
        for (const key of own) {
          covered.add(key)
        }
      }
      ctor = Object.getPrototypeOf(ctor) as object | null
    }
    const missing = requiredKeys.filter((key): boolean => !covered.has(key))
    if (missing.length > 0) {
      throw new Error(
        `${Ctor.name} is missing implementation of '${contractName}' member(s): ${missing.map(String).join(', ')}`
      )
    }
    const extraneous = [...covered].filter(
      (key): boolean => !requiredKeys.includes(key)
    )
    if (extraneous.length > 0) {
      throw new Error(
        `${Ctor.name} marks member(s) as implementing '${contractName}' that are not part of it: ${extraneous.map(String).join(', ')}`
      )
    }
    return Ctor
  }
}
