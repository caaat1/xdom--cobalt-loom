import type { NodeBundle } from '../../../../node/bundle/type.js'
import type { Molecule } from '../../../../tool/molecule/type.js'
import type { Stringifiable } from '../../../../tool/stringifiable/type.js'
import type { NodeChildBlueprint } from '../../../child/blueprint/type.js'
import type { NodeChild } from '../../../child/type.js'
import type { NodeParentBlueprint } from '../../blueprint/class.js'
import type { NodeParent } from '../../type.js'
import type { ChildAtom } from '../atom/type.js'

export type ChildMolecule<
  T_ParentBundle extends NodeBundle<
    NodeParent,
    NodeParentBlueprint<T_ParentBundle, T_ChildAllowedBundle>
  >,
  T_ChildAllowedBundle extends NodeBundle<
    NodeChild,
    NodeChildBlueprint<T_ChildAllowedBundle>
  >,
> = Molecule<ChildAtom<T_ParentBundle, T_ChildAllowedBundle>, Stringifiable>
