/**
 * Rest-parameter tuple for constructor signatures that must match every
 * constructor: `new (...args: CtorArgs) => T`, as in mixin and blueprint
 * ctor constraints.
 *
 * @remarks
 * The `any[]` is load-bearing, not a shortcut. Constructor parameters check
 * contravariantly, so `unknown[]` would reject every constructor with
 * narrower parameters (`unknown` is not assignable to, say, `string`); only
 * `any`, assignable in both directions, matches all constructors. Do not
 * reach for this type in ordinary array positions — use `unknown[]` there.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CtorArgs = any[]
