import { BACKING_METHODS, BACKING_STATIC_MEMBERS } from '../index.js'
import { ownBackingSet } from '../register/function.js'

const assertNotShadowingAncestor = (
  ownNames: Set<string | symbol> | undefined,
  startAncestor: object | null,
  memberLabel: string
): void => {
  if (ownNames === undefined || ownNames.size === 0) {
    return
  }
  let ancestor = startAncestor
  while (
    ancestor !== null &&
    ancestor !== Object.prototype &&
    ancestor !== Function.prototype
  ) {
    for (const name of ownNames) {
      if (Object.prototype.hasOwnProperty.call(ancestor, name)) {
        // `ancestor` is a prototype for the instance-method walk (its own
        // `.name` is never set, so this falls through to the class name via
        // `.constructor`) and a constructor itself for the static-member
        // walk (where `.name` IS the class name directly — `.constructor`
        // would instead resolve to `Function`, the wrong label entirely).
        const ancestorLabel =
          (ancestor as { name?: string }).name ??
          (ancestor as { constructor?: { name?: string } }).constructor?.name ??
          'an ancestor'
        throw new Error(
          `@back marks ${memberLabel} '${String(name)}' as a fresh implementation, but it already exists on ${ancestorLabel} — use 'override' instead of @back if this intentionally overrides it`
        )
      }
    }
    ancestor = Object.getPrototypeOf(ancestor) as object | null
  }
}

/**
 * Class decorator that enforces `@backMethod`/`@backProperty` markers
 * declared on THIS class: each marked member must not already exist as an
 * own member anywhere up the prototype/constructor chain. That's the one
 * half of "backs an abstract member" that's actually provable at runtime —
 * abstract members themselves are fully erased by the time this runs, so
 * there's no way to confirm the positive case (that an abstract member by
 * this name was ever declared). What this DOES catch: `@backMethod`/
 * `@backProperty` applied to a member that silently shadows a concrete
 * ancestor implementation — the exact ambiguity `@back` exists to rule out.
 *
 * Under `noImplicitOverride` (on in this project), the type checker already
 * forbids omitting `override` when a member genuinely shadows a concrete
 * ancestor member, so this mostly guards contradictory cases (`@backMethod`
 * used together with `override`) and any consumer executing compiled output
 * without re-checking types. Must be applied to every class using `@back*`
 * that should be checked — it is not inherited automatically.
 */
export function enforceBacking<T extends { new (...args: unknown[]): unknown }>(
  Ctor: T
): T {
  const proto = Ctor.prototype as object
  assertNotShadowingAncestor(
    ownBackingSet(Ctor, BACKING_METHODS),
    Object.getPrototypeOf(proto) as object | null,
    'method'
  )
  assertNotShadowingAncestor(
    ownBackingSet(Ctor, BACKING_STATIC_MEMBERS),
    Object.getPrototypeOf(Ctor) as object | null,
    'static member'
  )
  return Ctor
}
