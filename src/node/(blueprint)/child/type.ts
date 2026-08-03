import type { NodeChild } from '../../../(node)/child/type.js'
import type { NodeBlueprint } from '../../blueprint/class.js'
import type { NodeBundle } from '../../bundle/type.js'

export type NodeBlueprintChild<
  T_ChildBundle extends NodeBundle<
    NodeChild,
    NodeBlueprintChild<T_ChildBundle>
  >,
> = NodeBlueprint<T_ChildBundle>
