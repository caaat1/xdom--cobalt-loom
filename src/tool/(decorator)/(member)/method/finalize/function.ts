import { FINAL_METHODS, FINAL_STATIC_MEMBERS } from "../../../../class/(member)/final/index.js"
import { registerFinal } from "../../../../class/(member)/final/register/function.js"

/**
 * Method decorator that marks a method as final — not to be overridden.
 *
 * Works on instance and static methods: legacy decorators pass the prototype
 * for instance members and the constructor for static members, so the
 * declaring class is `target` itself whenever `target` is a function. The two
 * cases record into separate registries ({@link FINAL_METHODS} /
 * {@link FINAL_STATIC_MEMBERS}) because an instance and a static member may
 * legally share a name. Enforcement is opt-in: apply `enforceFinal` to each
 * subclass that should be checked.
 *
 * Also returns the descriptor non-configurable/non-writable, hardening the
 * declaring class's own slot against reassignment. That alone cannot stop a
 * subclass from shadowing — (re)declarations use [[Define]] semantics — which
 * is exactly what `enforceFinal` catches.
 */
export function finalizeMethod(
  target: object,
  propertyKey: string | symbol,
  descriptor?: PropertyDescriptor
): PropertyDescriptor | void {
  const isStatic = typeof target === 'function'
  registerFinal(
    isStatic ? target : target.constructor,
    isStatic ? FINAL_STATIC_MEMBERS : FINAL_METHODS,
    propertyKey
  )
  // Return a non-configurable, non-writable descriptor so TS decorator helper
  // will define the property once (avoids re-definition errors).
  if (
    descriptor !== undefined &&
    descriptor !== null &&
    typeof descriptor === 'object'
  ) {
    return {
      ...descriptor,
      configurable: false,
      writable: false,
    }
  }
  return undefined
}
