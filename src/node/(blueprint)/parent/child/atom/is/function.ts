import type { NodeChild } from '../../../../../../(node)/child/type.js'
import type { NodeParent } from '../../../../../../(node)/parent/type.js'
import type { NodeBundle } from '../../../../../bundle/type.js'
import type { NodeBlueprintChild } from '../../../../child/type.js'
import type { NodeBlueprintParent } from '../../../class.js'
import type { ChildAtom } from '../type.js'

export function isChildAtom<
  T_ParentBundle extends NodeBundle<
    NodeParent,
    NodeBlueprintParent<T_ParentBundle, T_ChildAllowedBundle>
  >,
  T_ChildAllowedBundle extends NodeBundle<
    NodeChild,
    NodeBlueprintChild<T_ChildAllowedBundle>
  >,
>(
  molecule: unknown
): molecule is ChildAtom<T_ParentBundle, T_ChildAllowedBundle> {
  // return molecule instanceof NodeBlueprint<T_Node, T_NodeBlueprint>
  void molecule
  // throw new Error('Not implemented')
  return true
}
