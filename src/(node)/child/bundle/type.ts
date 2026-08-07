import type { NodeBundle } from '../../../node/bundle/type.js'
import type { NodeChildBlueprint } from '../blueprint/type.js'
import type { NodeChild } from '../type.js'

export type NodeChildBundle<
  T_ChildAllowedBundle extends NodeChildBundle<T_ChildAllowedBundle>,
> = NodeBundle<NodeChild, NodeChildBlueprint<T_ChildAllowedBundle>>
