import type { NodeBuilder } from '../../../node/builder/class.js'
import type { NodeBundle } from '../../../node/bundle/type.js'
import type { NodeParamKeyOptional } from '../../../node/param/(key)/optional/type.js'
import type { NodeParamBundle } from '../../../node/param/bundle/type.js'
import type { NodeParam } from '../../../node/param/type.js'
import type { NodeChildBlueprint } from '../blueprint/type.js'
import type { NodeChild } from '../type.js'

export type ChildBuilder<
  T_ChildBundle extends NodeBundle<
    NodeChild,
    NodeChildBlueprint<T_ChildBundle>
  >,
  T_NodeParamBundle extends NodeParamBundle<NodeParam, NodeParamKeyOptional>,
> = NodeBuilder<T_ChildBundle, T_NodeParamBundle>
