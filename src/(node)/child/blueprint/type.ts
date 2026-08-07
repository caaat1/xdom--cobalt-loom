import type { NodeBlueprint } from '../../../node/blueprint/class.js'
import type { NodeChildBundle } from '../bundle/type.js'

export type NodeChildBlueprint<
  T_ChildBundle extends NodeChildBundle<T_ChildBundle>,
> = NodeBlueprint<T_ChildBundle>
