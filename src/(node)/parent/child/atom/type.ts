import type { NodeBundle } from '../../../../node/bundle/type.js'
import type { NodeChildBlueprint } from '../../../child/blueprint/type.js'
import type { NodeChild } from '../../../child/type.js'
import type { NodeParentBlueprint } from '../../blueprint/class.js'
import type { NodeParent } from '../../type.js'

export type ChildAtom<
  T_ParentBlueprintBundle extends NodeBundle<
    NodeParent,
    NodeParentBlueprint<T_ParentBlueprintBundle, T_ChildAllowedBlueprintBundle>
  >,
  T_ChildAllowedBlueprintBundle extends NodeBundle<
    NodeChild,
    NodeChildBlueprint<T_ChildAllowedBlueprintBundle>
  >,
> = T_ParentBlueprintBundle[1]
