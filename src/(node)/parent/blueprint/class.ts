import { NodeBlueprint } from '../../../node/blueprint/class.js'
import type { NodeChildBundle } from '../../child/bundle/type.js'
import type { NodeParentBundle } from '../bundle/type.js'
import { NodeParentChildAccumulator } from '../child/accumulator/class.js'
import type { NodeParentChildValidator } from '../child/validator/class.js'

export abstract class NodeParentBlueprint<
  T_NodeParentBundle extends NodeParentBundle<
    T_NodeParentBundle,
    T_NodeChildBundle
  >,
  T_NodeChildBundle extends NodeChildBundle<T_NodeChildBundle>,
> extends NodeBlueprint<T_NodeParentBundle> {
  protected _nodeParentChildAccumulator:
    | NodeParentChildAccumulator<T_NodeParentBundle, T_NodeChildBundle>
    | undefined

  get nodeParentChildAccumulator(): NodeParentChildAccumulator<
    T_NodeParentBundle,
    T_NodeChildBundle
  > {
    return (this._nodeParentChildAccumulator ??= new NodeParentChildAccumulator<
      T_NodeParentBundle,
      T_NodeChildBundle
    >({ owner: this }))
  }
  abstract readonly nodeParentChildValidator: NodeParentChildValidator<
    T_NodeParentBundle[1],
    T_NodeChildBundle[1]
  >
}
