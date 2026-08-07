import type { NodeBundle } from '../../../node/bundle/type.js'
import type { NodeChildBundle } from '../../child/bundle/type.js'
import type { NodeParentBlueprint } from '../blueprint/class.js'
import type { NodeParent } from '../type.js'

export type NodeParentBundle<
  T_ParentBundle extends NodeBundle<
    NodeParent,
    NodeParentBlueprint<T_ParentBundle, T_ChildAllowedBundle>
  >,
  T_ChildAllowedBundle extends NodeChildBundle<T_ChildAllowedBundle>,
> = NodeBundle<
  NodeParent,
  NodeParentBlueprint<T_ParentBundle, T_ChildAllowedBundle>
>
