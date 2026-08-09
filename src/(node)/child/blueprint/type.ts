import type { NodeBlueprint } from '../../../node/blueprint/class.js'
import type { NodeChildBundle } from '../bundle/type.js'

export type NodeChildBlueprint<
  T_NodeChildBundle extends NodeChildBundle<T_NodeChildBundle>,
> = NodeBlueprint<T_NodeChildBundle>
