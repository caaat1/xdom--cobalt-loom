import type { NodeBuilt } from '../../../node/built/class.js'
import type { NodeChildBundle } from '../bundle/type.js'

export type NodeChildBuilt<
  T_NodeChildBundle extends NodeChildBundle<T_NodeChildBundle>,
> = NodeBuilt<T_NodeChildBundle>
