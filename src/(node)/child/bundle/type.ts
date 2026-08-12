import type { NodeBundle } from '../../../node/bundle/alt/type.js'
import type { NodeChildBlueprint } from '../blueprint/type.js'
import type { NodeChild } from '../type.js'

export type NodeChildBundle<
  T_NodeChildBundle extends NodeChildBundle<T_NodeChildBundle>,
> = NodeBundle<NodeChild, NodeChildBlueprint<T_NodeChildBundle>>
