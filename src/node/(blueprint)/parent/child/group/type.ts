import type { NodeChild } from '../../../../../(node)/child/type.js'
import type { NodeParent } from '../../../../../(node)/parent/type.js'
import type { NodeBundle } from '../../../../bundle/type.js'
import type { NodeBlueprintChild } from '../../../child/type.js'
import type { NodeBlueprintParent } from '../../class.js'
import type { ChildMolecule } from '../molecule/type.js'

import type { ChildGroupOption } from './option/type.js'

export type ChildGroup<
  T_ParentBundle extends NodeBundle<
    NodeParent,
    NodeBlueprintParent<T_ParentBundle, T_ChildAllowedBundle>
  >,
  T_ChildAllowedBundle extends NodeBundle<
    NodeChild,
    NodeBlueprintChild<T_ChildAllowedBundle>
  >,
> = {
  molecule?: ChildMolecule<T_ParentBundle, T_ChildAllowedBundle>
  option?: ChildGroupOption
}
