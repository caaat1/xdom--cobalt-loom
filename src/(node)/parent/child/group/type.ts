import type { NodeBundle } from '../../../../node/bundle/type.js'
import type { NodeChildBlueprint } from '../../../child/blueprint/type.js'
import type { NodeChild } from '../../../child/type.js'
import type { NodeParentBlueprint } from '../../blueprint/class.js'
import type { NodeParent } from '../../type.js'
import type { ChildMolecule } from '../molecule/type.js'

import type { ChildGroupOption } from './option/type.js'

export type ChildGroup<
  T_ParentBundle extends NodeBundle<
    NodeParent,
    NodeParentBlueprint<T_ParentBundle, T_ChildAllowedBundle>
  >,
  T_ChildAllowedBundle extends NodeBundle<
    NodeChild,
    NodeChildBlueprint<T_ChildAllowedBundle>
  >,
> = {
  molecule?: ChildMolecule<T_ParentBundle, T_ChildAllowedBundle>
  option?: ChildGroupOption
}
