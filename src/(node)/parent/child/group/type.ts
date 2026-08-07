import type { NodeChildBundle } from '../../../child/bundle/type.js'
import type { NodeParentBundle } from '../../bundle/type.js'
import type { NodeParentChildMolecule } from '../molecule/type.js'

import type { NodeParentChildGroupOption } from './option/type.js'

export type NodeParentChildGroup<
  T_NodeParentBundle extends NodeParentBundle<
    T_NodeParentBundle,
    T_NodeChildBundle
  >,
  T_NodeChildBundle extends NodeChildBundle<T_NodeChildBundle>,
> = {
  molecule?: NodeParentChildMolecule<T_NodeParentBundle, T_NodeChildBundle>
  option?: NodeParentChildGroupOption
}
