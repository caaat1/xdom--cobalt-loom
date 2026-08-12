import type { NodeBundle } from '../../../node/bundle/alt/type.js'
import type { NodeChildBundle } from '../../child/bundle/type.js'
import type { NodeParentBlueprint } from '../blueprint/class.js'
import type { NodeParent } from '../type.js'

export type NodeParentBundle<
  T_NodeParentBundle extends NodeBundle<
    NodeParent,
    NodeParentBlueprint<T_NodeParentBundle, T_NodeChildBundle>
  >,
  T_NodeChildBundle extends NodeChildBundle<T_NodeChildBundle>,
> = NodeBundle<
  NodeParent,
  NodeParentBlueprint<T_NodeParentBundle, T_NodeChildBundle>
>
