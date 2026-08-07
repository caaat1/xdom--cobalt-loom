import type { NodeChildBundle } from '../../../child/bundle/type.js'
import type { NodeParentBundle } from '../../bundle/type.js'
import type { ChildAccumulator } from '../../child/accumulator/class.js'
import type { ChildValidator } from '../../child/validator/class.js'

// TODO: adjust the shape (order of the members) to suit the client code structure
export type NodeParentBuilderBundle<
  T_ParentBundle extends NodeParentBundle<T_ParentBundle, T_ChildAllowedBundle>,
  T_ChildAllowedBundle extends NodeChildBundle<T_ChildAllowedBundle>,
> = [
  parent: [bundle: T_ParentBundle],
  childAllowed: [
    bundle: T_ChildAllowedBundle,
    accumulator: ChildAccumulator<T_ParentBundle, T_ChildAllowedBundle>,
    validator: ChildValidator<T_ParentBundle[1], T_ChildAllowedBundle[1]>,
  ],
]
