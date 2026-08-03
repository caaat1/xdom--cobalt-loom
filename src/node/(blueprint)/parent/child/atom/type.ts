import type { NodeChild } from '../../../../../(node)/child/type.js'
import type { NodeParent } from '../../../../../(node)/parent/type.js'
import type { NodeBundle } from '../../../../bundle/type.js'
import type { NodeBlueprintChild } from '../../../child/type.js'
import type { NodeBlueprintParent } from '../../class.js'

export type ChildAtom<
  T_ParentBlueprintBundle extends NodeBundle<
    NodeParent,
    NodeBlueprintParent<T_ParentBlueprintBundle, T_ChildAllowedBlueprintBundle>
  >,
  T_ChildAllowedBlueprintBundle extends NodeBundle<
    NodeChild,
    NodeBlueprintChild<T_ChildAllowedBlueprintBundle>
  >,
> = T_ParentBlueprintBundle[1]
