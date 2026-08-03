import type { NodeBundle } from '../../../../bundle/type.js'
import type { UnionChild } from '../../../../union/child/type.js'
import type { UnionParent } from '../../../../union/parent/type.js'
import type { NodeBlueprintChild } from '../../../child/type.js'
import type { NodeBlueprintParent } from '../../class.js'
import type { ChildMolecule } from '../molecule/type.js'

import type { ChildGroupOption } from './option/type.js'

export type ChildGroup<
  T_ParentBundle extends NodeBundle<
    UnionParent,
    NodeBlueprintParent<T_ParentBundle, T_ChildAllowedBundle>
  >,
  T_ChildAllowedBundle extends NodeBundle<
    UnionChild,
    NodeBlueprintChild<T_ChildAllowedBundle>
  >,
> = {
  molecule?: ChildMolecule<T_ParentBundle, T_ChildAllowedBundle>
  option?: ChildGroupOption
}
