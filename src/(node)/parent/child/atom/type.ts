import type { NodeChildBundle } from '../../../child/bundle/type.js'
import type { NodeParentBundle } from '../../bundle/type.js'

export type NodeParentChildAtom<
  T_NodeParentBundle extends NodeParentBundle<
    T_NodeParentBundle,
    T_NodeChildBundle
  >,
  T_NodeChildBundle extends NodeChildBundle<T_NodeChildBundle>,
> = T_NodeChildBundle['nodeBlueprint']
