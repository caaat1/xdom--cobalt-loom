import type { Molecule } from '../../../../tool/molecule/type.js'
import type { Stringifiable } from '../../../../tool/stringifiable/type.js'
import type { NodeChildBundle } from '../../../child/bundle/type.js'
import type { NodeParentBundle } from '../../bundle/type.js'
import type { NodeParentChildAtom } from '../atom/type.js'

export type NodeParentChildMolecule<
  T_NodeParentBundle extends NodeParentBundle<
    T_NodeParentBundle,
    T_NodeChildBundle
  >,
  T_NodeChildBundle extends NodeChildBundle<T_NodeChildBundle>,
> = Molecule<
  NodeParentChildAtom<T_NodeParentBundle, T_NodeChildBundle>,
  Stringifiable
>
