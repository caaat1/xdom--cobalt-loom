import {
  BACKING_METHODS,
  BACKING_STATIC_MEMBERS,
} from '../../../../class/(member)/backing/index.js'
import { registerBacking } from '../../../../class/(member)/backing/register/function.js'

/**
 * Method decorator that marks a method as backing an abstract member — a
 * fresh concrete implementation, not an override of a concrete parent
 * method. Purely a documentation aid at a glance; enforcement is opt-in via
 * `enforceBacking` on the declaring class, which checks that the marked
 * member does not already exist as a concrete member anywhere up the
 * chain (see {@link enforceBacking} for exactly what that does and doesn't
 * prove).
 *
 * Works on instance and static methods: legacy decorators pass the
 * prototype for instance members and the constructor for static members, so
 * the declaring class is `target` itself whenever `target` is a function.
 * The two cases record into separate registries ({@link BACKING_METHODS} /
 * {@link BACKING_STATIC_MEMBERS}) for the same reason `finalizeMethod` does:
 * an instance and a static member may legally share a name.
 */
export function backMethod(
  target: object,
  propertyKey?: string | symbol,
  descriptor?: PropertyDescriptor
): PropertyDescriptor | void {
  if (propertyKey !== undefined) {
    const isStatic = typeof target === 'function'
    registerBacking(
      isStatic ? target : (target as { constructor: object }).constructor,
      isStatic ? BACKING_STATIC_MEMBERS : BACKING_METHODS,
      propertyKey
    )
  }
  return descriptor
}
