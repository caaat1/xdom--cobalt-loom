import { registerImplementing } from '../../../../class/(member)/implementing/register/function.js'

/**
 * Method decorator factory that marks a method as implementing a named
 * contract (an interface/type member with no runtime representation of its
 * own). Purely a documentation aid at a glance by itself; enforcement is
 * opt-in via `enforceImplementing(contractName, requiredKeys)` on the
 * declaring class.
 *
 * Works on instance and static methods alike: both register onto the
 * declaring constructor (legacy decorators pass the constructor directly for
 * static members, and the prototype's `constructor` for instance members),
 * since contract coverage isn't split by static/instance the way `final`/
 * `backing` split their registries — a contract's member set is just names.
 */
export function implementMethod(
  contractName: string
): (
  target: object,
  propertyKey?: string | symbol,
  descriptor?: PropertyDescriptor
) => PropertyDescriptor | void {
  return (
    target: object,
    propertyKey?: string | symbol,
    descriptor?: PropertyDescriptor
  ): PropertyDescriptor | void => {
    if (propertyKey !== undefined) {
      const ctor =
        typeof target === 'function'
          ? target
          : (target as { constructor: object }).constructor
      registerImplementing(ctor, contractName, propertyKey)
    }
    return descriptor
  }
}
