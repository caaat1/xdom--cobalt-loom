import type { NodeBlueprint } from '../../../node/blueprint/class.js'
import type { NodeBundle } from '../../../node/bundle/type.js'
import type { NodeChild } from '../type.js'

export type NodeChildBlueprint<
  T_ChildBundle extends NodeBundle<
    NodeChild,
    NodeChildBlueprint<T_ChildBundle>
  >,
> = NodeBlueprint<T_ChildBundle>
