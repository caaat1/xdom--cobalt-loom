import { registerImplementing } from '../../../../class/(member)/implementing/register/function.js'

/**
 * Field decorator factory that marks a field as implementing a named
 * contract. See `implementMethod` for the full rationale — fields register
 * the same way, just without a `descriptor` to thread through.
 */
export function implementProperty(
  contractName: string
): (target: object, propertyKey?: string | symbol) => void {
  return (target: object, propertyKey?: string | symbol): void => {
    if (propertyKey !== undefined) {
      const ctor =
        typeof target === 'function'
          ? target
          : (target as { constructor: object }).constructor
      registerImplementing(ctor, contractName, propertyKey)
    }
  }
}
