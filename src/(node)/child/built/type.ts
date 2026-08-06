import type { NodeBuilt } from '../../../node/built/class.js'
import type { NodeBundle } from '../../../node/bundle/type.js'
import type { NodeChildBlueprint } from '../blueprint/type.js'
import type { NodeChild } from '../type.js'

export type ChildBuilt<
  T_ChildBundle extends NodeBundle<
    NodeChild,
    NodeChildBlueprint<T_ChildBundle>
  >,
> = NodeBuilt<T_ChildBundle>
