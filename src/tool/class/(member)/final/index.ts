/** Registry key for final INSTANCE methods, recorded on the declaring class's constructor. */
export const FINAL_METHODS: unique symbol = Symbol('final_methods')

/**
 * Registry key for final STATIC members — methods and fields together, since
 * they share the constructor's namespace. Kept separate from
 * {@link FINAL_METHODS} because an instance member and a static member may
 * legally share a name.
 */
export const FINAL_STATIC_MEMBERS: unique symbol = Symbol(
  'final_static_members'
)
