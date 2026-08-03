import { FINAL_METHODS, FINAL_STATIC_MEMBERS } from '../index.js'
import { ownFinalSet } from '../register/function.js'

const assertNoFinalOverride = (
  candidate: object,
  registryCtor: object,
  registryKey: symbol,
  memberLabel: string
): void => {
  const finals = ownFinalSet(registryCtor, registryKey)
  if (finals === undefined) {
    return
  }
  for (const name of finals) {
    if (Object.prototype.hasOwnProperty.call(candidate, name)) {
      const parentName = (registryCtor as { name?: string }).name ?? 'parent'
      throw new Error(
        `Cannot override final ${memberLabel} '${String(name)}' from ${parentName}`
      )
    }
  }
}

/**
 * Class decorator that enforces final-member constraints declared by ANY
 * ancestor: instance methods via the prototype chain, static members
 * (methods and fields) via the constructor chain — statics live as own
 * properties of the constructors themselves and inherit through
 * `Sub.__proto__ === Base`, so the prototype walk alone cannot see them.
 *
 * The check is definition-time by necessity: member (re)declarations use
 * [[Define]] semantics, which no property attribute on an ancestor can block.
 *
 * Must be applied to every subclass that should be checked — it is not
 * inherited automatically.
 */
export function enforceFinal<T extends { new (...args: unknown[]): unknown }>(
  Ctor: T
): T {
  const proto = Ctor.prototype as object
  let parentProto = Object.getPrototypeOf(proto) as object | null
  while (parentProto !== null && parentProto !== Object.prototype) {
    assertNoFinalOverride(
      proto,
      parentProto.constructor,
      FINAL_METHODS,
      'method'
    )
    parentProto = Object.getPrototypeOf(parentProto) as object | null
  }
  let parentCtor = Object.getPrototypeOf(Ctor) as object | null
  while (parentCtor !== null && parentCtor !== Function.prototype) {
    assertNoFinalOverride(
      Ctor,
      parentCtor,
      FINAL_STATIC_MEMBERS,
      'static member'
    )
    parentCtor = Object.getPrototypeOf(parentCtor) as object | null
  }
  return Ctor
}
