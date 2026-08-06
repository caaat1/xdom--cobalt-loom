import type { NodeChild } from '../../../(node)/child/type.js'
import type { NodeParent } from '../../../(node)/parent/type.js'
import { NodeBlueprint } from '../../../node/blueprint/class.js'
import type { NodeBundle } from '../../../node/bundle/type.js'
import type { NodeChildBlueprint } from '../../child/blueprint/type.js'
import { ChildAccumulator } from '../child/accumulator/class.js'
import type { ChildValidator } from '../child/validator/class.js'

export abstract class NodeParentBlueprint<
  T_ParentBundle extends NodeBundle<
    NodeParent,
    NodeParentBlueprint<T_ParentBundle, T_ChildAllowedBundle>
  >,
  T_ChildAllowedBundle extends NodeBundle<
    NodeChild,
    NodeChildBlueprint<T_ChildAllowedBundle>
  >,
> extends NodeBlueprint<T_ParentBundle> {
  protected _childAccumulator:
    ChildAccumulator<T_ParentBundle, T_ChildAllowedBundle> | undefined

  get childAccumulator(): ChildAccumulator<
    T_ParentBundle,
    T_ChildAllowedBundle
  > {
    return (this._childAccumulator ??= new ChildAccumulator<
      T_ParentBundle,
      T_ChildAllowedBundle
    >({ owner: this }))
  }
  abstract readonly childAllowed: ChildValidator<
    T_ParentBundle[1],
    T_ChildAllowedBundle[1]
  >
}
