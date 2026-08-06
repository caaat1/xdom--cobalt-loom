import { FINAL_STATIC_MEMBERS } from '../../../../class/(member)/final/index.js'
import { registerFinal } from '../../../../class/(member)/final/register/function.js'

/**
 * Field decorator that marks a field as final — not to be overridden.
 *
 * Static fields (legacy decorators pass the constructor as `target`) are
 * registered under {@link FINAL_STATIC_MEMBERS} for the definition-time
 * subclass check in `enforceFinal`, and the declaring class's own slot is
 * frozen against reassignment — the initializer has already run, since
 * decorators apply after class creation.
 *
 * Instance fields cannot be given the same guarantee: under [[Define]]
 * semantics (`target: ES2022`) fields never appear on prototypes, so a
 * subclass redeclaration is invisible to `enforceFinal` and unblockable by
 * property attributes. The prototype freeze below only guards the
 * `this.foo = …` assignment pattern, which uses [[Set]] and does consult the
 * chain; an initialized field redeclaration bypasses it.
 */
export function finalizeProperty(target: object, propertyKey: string): void {
  if (typeof target === 'function') {
    registerFinal(target, FINAL_STATIC_MEMBERS, propertyKey)
  }
  Object.defineProperty(target, propertyKey, {
    configurable: false,
    writable: false,
  })
}
