import { NodeBlueprint } from '../../blueprint/class.js'
import type { NodeBundle } from '../../bundle/type.js'
import type { UnionChild } from '../../union/child/type.js'
import type { UnionParent } from '../../union/parent/type.js'
import type { NodeBlueprintChild } from '../child/type.js'

import { ChildAccumulator } from './child/accumulator/class.js'
import type { ChildValidator } from './child/validator/class.js'

export abstract class NodeBlueprintParent<
  T_ParentBundle extends NodeBundle<
    UnionParent,
    NodeBlueprintParent<T_ParentBundle, T_ChildAllowedBundle>
  >,
  T_ChildAllowedBundle extends NodeBundle<
    UnionChild,
    NodeBlueprintChild<T_ChildAllowedBundle>
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
