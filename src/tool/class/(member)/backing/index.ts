/** Registry key for INSTANCE methods marked `@backMethod`, recorded on the declaring class's constructor. */
export const BACKING_METHODS: unique symbol = Symbol('backing_methods')

/**
 * Registry key for STATIC members marked `@backMethod`/`@backProperty` —
 * methods and fields together, since they share the constructor's
 * namespace. Kept separate from {@link BACKING_METHODS} because an instance
 * member and a static member may legally share a name.
 */
export const BACKING_STATIC_MEMBERS: unique symbol = Symbol(
  'backing_static_members'
)
