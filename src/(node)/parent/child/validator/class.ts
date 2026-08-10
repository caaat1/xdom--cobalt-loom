import type { NodeBlueprintCtorWide } from '../../../../node/blueprint/ctor/wide/type.js'
import { implementMethod } from '../../../../tool/(decorator)/(member)/method/implement/function.js'
import type { _lf } from '../../../../tool/_lf/interface.js'

import type { NodeParentChildValidatorCb } from './cb/type.js'

export class NodeParentChildValidator<
  T_NodeParentBlueprint,
  T_NodeChildBlueprintAccumulator = never,
> implements _lf {
  /**
   * T_NodeBlueprintChildAccumulator appears in both parameter
   * (contravariant) and return (covariant) positions, making it invariant:
   * the registered set must exactly match the declared union — no more, no
   * less. Trade-off: a subclass that extends the allowed set must also update
   * the static field's type annotation to match, or TS will error. To fall
   * back to a lower-bound-only check (superset registrations allowed), change
   * the return type back to `void`.
   */
  declare protected readonly _getInvariant: (
    _: T_NodeChildBlueprintAccumulator
  ) => T_NodeChildBlueprintAccumulator
  private readonly map = new Map<NodeBlueprintCtorWide<unknown>, unknown>()
  registerChildAllowed<T_NodeChildBlueprint>(
    childCtor: NodeBlueprintCtorWide<T_NodeChildBlueprint>,
    validator:
      | NodeParentChildValidatorCb<T_NodeParentBlueprint, T_NodeChildBlueprint>
      | undefined
  ): NodeParentChildValidator<
    T_NodeParentBlueprint,
    T_NodeChildBlueprintAccumulator | T_NodeChildBlueprint
  > {
    this.map.set(childCtor, validator)
    // `ReturnType<typeof this.registerChildAllowed>` cannot be used here: the
    // invariant phantom (_getInvariant) causes TS to resolve the unbound
    // method-level T_NodeChildBlueprint to `unknown`, yielding
    // ChildValidator<P, Acc | unknown> = ChildValidator<P, unknown>, which
    // fails the invariant check against the declared return type.
    return this as unknown as NodeParentChildValidator<
      T_NodeParentBlueprint,
      T_NodeChildBlueprintAccumulator | T_NodeChildBlueprint
    >
  }
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
    const rawCb = this.map.get(childCtor)
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
