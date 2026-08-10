import type { NodeBlueprintCtorWide } from '../../../../node/blueprint/ctor/wide/type.js'
import { implementMethod } from '../../../../tool/(decorator)/(member)/method/implement/function.js'
import type { _lf } from '../../../../tool/_lf/interface.js'

import type { NodeParentChildValidatorCb } from './cb/type.js'

export class NodeParentChildValidator<
  T_NodeParentBlueprint,
  T_NodeChildBlueprintAccumulator = never,
> implements _lf {
  /**
   * T_NodeChildBlueprintAccumulator appears in both parameter
   * (contravariant) and return (covariant) positions, making it invariant:
   * the registered set must exactly match the declared union — no more, no
   * less. Trade-off: wherever the built-up return type is captured (e.g. an
   * abstract member a subclass fills in) must be updated to match if the
   * allowed set changes, or TS will error. To fall back to a
   * lower-bound-only check (superset registrations allowed), change the
   * return type back to `void`.
   */
  declare protected readonly _getInvariant: (
    _: T_NodeChildBlueprintAccumulator
  ) => T_NodeChildBlueprintAccumulator
  // Keyed by the exact child ctor passed to registerChildAllowed -- lookup in
  // `validate` below is by constructor identity, not `instanceof`, so a cb
  // registered for a base blueprint ctor does not apply to a subclass
  // instance of it (see that method's own doc comment).
  private readonly childCtorToCb = new Map<
    NodeBlueprintCtorWide<unknown>,
    unknown
  >()
  registerChildAllowed<T_NodeChildBlueprint>(
    childCtor: NodeBlueprintCtorWide<T_NodeChildBlueprint>,
    cb:
      | NodeParentChildValidatorCb<T_NodeParentBlueprint, T_NodeChildBlueprint>
      | undefined
  ): NodeParentChildValidator<
    T_NodeParentBlueprint,
    T_NodeChildBlueprintAccumulator | T_NodeChildBlueprint
  > {
    // Re-registering an already-registered childCtor silently overwrites its
    // previous cb (last write wins) -- Map.set semantics, not additive.
    this.childCtorToCb.set(childCtor, cb)
    // `ReturnType<typeof this.registerChildAllowed>` cannot be used here: the
    // invariant phantom (_getInvariant) causes TS to resolve the unbound
    // method-level T_NodeChildBlueprint to `unknown`, yielding
    // NodeParentChildValidator<P, Acc | unknown> =
    // NodeParentChildValidator<P, unknown>, which fails the invariant check
    // against the declared return type.
    return this as unknown as NodeParentChildValidator<
      T_NodeParentBlueprint,
      T_NodeChildBlueprintAccumulator | T_NodeChildBlueprint
    >
  }
  /**
   * Looks up the cb registered for `nodeChildBlueprint`'s exact constructor
   * (not `instanceof` -- a cb registered for a base blueprint ctor will not
   * fire for a subclass instance of it, and validates as unconditionally
   * allowed instead) and defers to it. Two cases both fall through to
   * `true` (allowed) rather than `false`: a childCtor that was never
   * registered at all, and one registered with `undefined` in place of a cb
   * -- `registerChildAllowed`'s `cb` param exists to attach an *additional*
   * runtime predicate on top of a child type already known allowed (that's
   * `T_NodeChildBlueprintAccumulator`/the compile-time union's job); it is
   * not itself what makes a child type allowed, so "no cb" is a no-op, not
   * a rejection.
   */
  validate<T_NodeChildBlueprint>({
    nodeParentBlueprint,
    nodeChildBlueprint,
  }: {
    nodeParentBlueprint: T_NodeParentBlueprint
    nodeChildBlueprint: T_NodeChildBlueprint
  }): boolean {
    const childCtor = (
      nodeChildBlueprint as {
        constructor: NodeBlueprintCtorWide<T_NodeChildBlueprint>
      }
    ).constructor
    const rawCb = this.childCtorToCb.get(childCtor)
    if (rawCb === undefined) {
      return true
    }
    const cb = rawCb as NodeParentChildValidatorCb<
      T_NodeParentBlueprint,
      T_NodeChildBlueprint
    >
    return cb({ nodeParentBlueprint, nodeChildBlueprint })
  }
  @implementMethod('_lf') _lf(): this {
    return this
  }
}
