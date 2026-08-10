import { NodeBlueprint } from '../../../node/blueprint/class.js'
import type { NodeBlueprintCtorWide } from '../../../node/blueprint/ctor/wide/type.js'
import type { NodeChildBundle } from '../../child/bundle/type.js'
import type { NodeParentBundle } from '../bundle/type.js'
import { NodeParentChildAccumulator } from '../child/accumulator/class.js'
import type { NodeParentChildValidatorCb } from '../child/validator/cb/type.js'
import { NodeParentChildValidator } from '../child/validator/class.js'

export abstract class NodeParentBlueprint<
  T_NodeParentBundle extends NodeParentBundle<
    T_NodeParentBundle,
    T_NodeChildBundle
  >,
  T_NodeChildBundle extends NodeChildBundle<T_NodeChildBundle>,
> extends NodeBlueprint<T_NodeParentBundle> {
  protected _nodeParentChildAccumulator?: typeof this.nodeParentChildAccumulator
  protected _nodeParentChildValidator?: typeof this.nodeParentChildValidator
  protected abstract readonly _nodeParentChildAllowed: typeof this.nodeParentChildAllowed
  get nodeParentChildAccumulator(): NodeParentChildAccumulator<
    T_NodeParentBundle,
    T_NodeChildBundle
  > {
    return (this._nodeParentChildAccumulator ??= new NodeParentChildAccumulator<
      T_NodeParentBundle,
      T_NodeChildBundle
    >({ owner: this }))
  }
  get nodeParentChildValidator(): NodeParentChildValidator<
    T_NodeParentBundle[1]
  > {
    return (this._nodeParentChildValidator ??= new NodeParentChildValidator<
      T_NodeParentBundle[1]
    >())
  }
  get nodeParentChildAllowed(): NodeParentChildValidator<
    T_NodeParentBundle[1],
    T_NodeChildBundle[1]
  > {
    return this._nodeParentChildAllowed
  }
  protected registerChildAllowed<T_NodeChildBlueprint>(
    childCtor: NodeBlueprintCtorWide<T_NodeChildBlueprint>,
    validator:
      | NodeParentChildValidatorCb<T_NodeParentBundle[1], T_NodeChildBlueprint>
      | undefined
  ): NodeParentChildValidator<T_NodeParentBundle[1], T_NodeChildBlueprint> {
    return this.nodeParentChildValidator.registerChildAllowed(
      childCtor,
      validator
    )
  }
}
