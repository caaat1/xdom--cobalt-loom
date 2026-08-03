import type { NodeBlueprint } from '../../blueprint/class.js'
import type { NodeBundle } from '../../bundle/type.js'
import type { UnionChild } from '../../union/child/type.js'

export type NodeBlueprintChild<
  T_ChildBundle extends NodeBundle<
    UnionChild,
    NodeBlueprintChild<T_ChildBundle>
  >,
> = NodeBlueprint<T_ChildBundle>
