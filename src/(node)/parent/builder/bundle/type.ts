import type { NodeChildBundle } from '../../../child/bundle/type.js'
import type { NodeParentBundle } from '../../bundle/type.js'
import type { NodeParentChildAccumulator } from '../../child/accumulator/class.js'
import type { NodeParentChildValidator } from '../../child/validator/class.js'

// TODO: adjust the shape (order of the members) to suit the client code structure
export type NodeParentBuilderBundle<
  T_NodeParentBundle extends NodeParentBundle<
    T_NodeParentBundle,
    T_NodeChildBundle
  >,
  T_NodeChildBundle extends NodeChildBundle<T_NodeChildBundle>,
> = [
  parent: [bundle: T_NodeParentBundle],
  child: [
    bundle: T_NodeChildBundle,
    accumulator: NodeParentChildAccumulator<
      T_NodeParentBundle,
      T_NodeChildBundle
    >,
    validator: NodeParentChildValidator<
      T_NodeParentBundle[1],
      T_NodeChildBundle[1]
    >,
  ],
]
