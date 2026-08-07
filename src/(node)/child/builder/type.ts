import type { NodeBuilder } from '../../../node/builder/class.js'
import type { NodeParamKeyOptional } from '../../../node/param/(key)/optional/type.js'
import type { NodeParamBundle } from '../../../node/param/bundle/type.js'
import type { NodeParam } from '../../../node/param/type.js'
import type { NodeChildBundle } from '../bundle/type.js'

export type NodeChildBuilder<
  T_ChildBundle extends NodeChildBundle<T_ChildBundle>,
  T_NodeParamBundle extends NodeParamBundle<NodeParam, NodeParamKeyOptional>,
> = NodeBuilder<T_ChildBundle, T_NodeParamBundle>
