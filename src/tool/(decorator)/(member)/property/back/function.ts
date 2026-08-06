import { BACKING_STATIC_MEMBERS } from '../../../../class/(member)/backing/index.js'
import { registerBacking } from '../../../../class/(member)/backing/register/function.js'

/**
 * Field decorator that marks a field as backing an abstract member — a
 * fresh concrete implementation, not an override of a concrete parent
 * field. Purely a documentation aid at a glance; enforcement is opt-in via
 * `enforceBacking` on the declaring class.
 *
 * Static fields (legacy decorators pass the constructor as `target`) are
 * registered under {@link BACKING_STATIC_MEMBERS}, checkable the same way
 * `finalizeProperty` freezes them: they're genuinely own properties of the
 * constructor at decoration time.
 *
 * Instance fields cannot be given the same guarantee, for the same reason
 * `finalizeProperty` documents: under [[Define]] semantics (`target:
 * ES2022`) fields never appear on prototypes, so at decoration time there is
 * nothing yet to check a field's name against. `@backProperty` on an
 * instance field is therefore a pure intent marker with no runtime backing.
 */
export function backProperty(target: object, propertyKey: string): void {
  if (typeof target === 'function') {
    registerBacking(target, BACKING_STATIC_MEMBERS, propertyKey)
  }
}
