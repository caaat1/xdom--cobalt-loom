import type { NodeBuilder } from '../../../node/builder/class.js'
import type { NodeParamKeyPartial } from '../../../node/param/(key)/partial/type.js'
import type { NodeParamBundle } from '../../../node/param/bundle/type.js'
import type { NodeParam } from '../../../node/param/type.js'
import type { NodeChildBundle } from '../bundle/type.js'

export type NodeChildBuilder<
  T_NodeChildBundle extends NodeChildBundle<T_NodeChildBundle>,
  T_NodeChildParamBundle extends NodeParamBundle<
    NodeParam,
    NodeParamKeyPartial
  >,
> = NodeBuilder<T_NodeChildBundle, T_NodeChildParamBundle>
