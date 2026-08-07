import type { NodeBuilt } from '../../../node/built/class.js'
import type { NodeChildBundle } from '../bundle/type.js'

export type NodeChildBuilt<
  T_ChildBundle extends NodeChildBundle<T_ChildBundle>,
> = NodeBuilt<T_ChildBundle>
