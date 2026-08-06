/**
 * Registry key for members marked `@implementMethod`/`@implementProperty`,
 * recorded on the declaring class's constructor as a `Map` keyed by contract
 * name — a class can implement more than one named contract, each with its
 * own member set.
 */
export const IMPLEMENTING_MEMBERS: unique symbol = Symbol(
  'implementing_members'
)
