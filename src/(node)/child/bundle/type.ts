import type { NodeBundle } from '../../../node/bundle/type.js'
import type { NodeChildBlueprint } from '../blueprint/type.js'
import type { NodeChild } from '../type.js'

export type NodeChildBundle<
  T_ChildBundle extends NodeChildBundle<T_ChildBundle>,
> = NodeBundle<NodeChild, NodeChildBlueprint<T_ChildBundle>>
