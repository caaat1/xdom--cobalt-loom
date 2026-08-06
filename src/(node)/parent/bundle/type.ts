import type { NodeBundle } from '../../../node/bundle/type.js'
import type { NodeChildBlueprint } from '../../child/blueprint/type.js'
import type { NodeChild } from '../../child/type.js'
import type { NodeParentBlueprint } from '../blueprint/class.js'
import type { ChildAccumulator } from '../child/accumulator/class.js'
import type { ChildValidator } from '../child/validator/class.js'
import type { NodeParent } from '../type.js'

// TODO: adjust the shape (order of the members) to suit the client code structure
export type ParentRealizerBundle<
  T_ParentBundle extends NodeBundle<
    NodeParent,
    NodeParentBlueprint<T_ParentBundle, T_ChildAllowedBundle>
  >,
  T_ChildAllowedBundle extends NodeBundle<
    NodeChild,
    NodeChildBlueprint<T_ChildAllowedBundle>
  >,
> = [
  parent: [bundle: T_ParentBundle],
  childAllowed: [
    bundle: T_ChildAllowedBundle,
    accumulator: ChildAccumulator<T_ParentBundle, T_ChildAllowedBundle>,
    validator: ChildValidator<T_ParentBundle[1], T_ChildAllowedBundle[1]>,
  ],
]
