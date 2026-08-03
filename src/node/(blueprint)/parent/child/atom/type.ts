import type { NodeBundle } from '../../../../bundle/type.js'
import type { UnionChild } from '../../../../union/child/type.js'
import type { UnionParent } from '../../../../union/parent/type.js'
import type { NodeBlueprintChild } from '../../../child/type.js'
import type { NodeBlueprintParent } from '../../class.js'

export type ChildAtom<
  T_ParentBlueprintBundle extends NodeBundle<
    UnionParent,
    NodeBlueprintParent<T_ParentBlueprintBundle, T_ChildAllowedBlueprintBundle>
  >,
  T_ChildAllowedBlueprintBundle extends NodeBundle<
    UnionChild,
    NodeBlueprintChild<T_ChildAllowedBlueprintBundle>
  >,
> = T_ParentBlueprintBundle[1]
