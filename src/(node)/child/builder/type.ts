import type { NodeBuilder } from '../../../node/builder/class.js'
import type { NodeParamMapBundle } from '../../../node/param/map/bundle/alt/type.js'
import type { NodeParamMapPartial } from '../../../node/param/map/partial/type.js'
import type { NodeParamMapRequired } from '../../../node/param/map/required/type.js'
import type { NodeChildBundle } from '../bundle/type.js'

export type NodeChildBuilder<
  T_NodeChildBundle extends NodeChildBundle<T_NodeChildBundle>,
  T_NodeParamMapBundle extends NodeParamMapBundle<
    NodeParamMapPartial,
    NodeParamMapRequired
  >,
> = NodeBuilder<T_NodeChildBundle, T_NodeParamMapBundle>
