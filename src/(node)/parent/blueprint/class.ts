import { NodeBlueprint } from '../../../node/blueprint/class.js'
import type { NodeChildBundle } from '../../child/bundle/type.js'
import type { NodeParentBundle } from '../bundle/type.js'
import { ChildAccumulator } from '../child/accumulator/class.js'
import type { ChildValidator } from '../child/validator/class.js'

export abstract class NodeParentBlueprint<
  T_ParentBundle extends NodeParentBundle<T_ParentBundle, T_ChildAllowedBundle>,
  T_ChildAllowedBundle extends NodeChildBundle<T_ChildAllowedBundle>,
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
