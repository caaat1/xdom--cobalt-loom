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
  protected _childAccumulator?: typeof this.childAccumulator
  protected _childValidator?: typeof this.childValidator
  protected abstract readonly _childAllowed: typeof this.childAllowed
  get childAccumulator(): NodeParentChildAccumulator<
    T_NodeParentBundle,
    T_NodeChildBundle
  > {
    return (this._childAccumulator ??= new NodeParentChildAccumulator<
      T_NodeParentBundle,
      T_NodeChildBundle
    >({ owner: this }))
  }
  get childValidator(): NodeParentChildValidator<
    T_NodeParentBundle['nodeBlueprint']
  > {
    return (this._childValidator ??= new NodeParentChildValidator<
      T_NodeParentBundle['nodeBlueprint']
    >())
  }
  get childAllowed(): NodeParentChildValidator<
    T_NodeParentBundle['nodeBlueprint'],
    T_NodeChildBundle['nodeBlueprint']
  > {
    return this._childAllowed
  }
  protected registerChildAllowed<T_NodeChildBlueprint>(
    childCtor: NodeBlueprintCtorWide<T_NodeChildBlueprint>,
    validator:
      | NodeParentChildValidatorCb<
          T_NodeParentBundle['nodeBlueprint'],
          T_NodeChildBlueprint
        >
      | undefined
  ): NodeParentChildValidator<
    T_NodeParentBundle['nodeBlueprint'],
    T_NodeChildBlueprint
  > {
    return this.childValidator.registerChildAllowed(childCtor, validator)
  }
}
