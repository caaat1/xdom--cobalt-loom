import type { NodeBundle } from '../../../../../node/bundle/type.js'
import type { NodeChildBlueprint } from '../../../../child/blueprint/type.js'
import type { NodeChild } from '../../../../child/type.js'
import type { NodeParentBlueprint } from '../../../blueprint/class.js'
import type { NodeParent } from '../../../type.js'
import type { ChildAtom } from '../type.js'

export function isChildAtom<
  T_ParentBundle extends NodeBundle<
    NodeParent,
    NodeParentBlueprint<T_ParentBundle, T_ChildAllowedBundle>
  >,
  T_ChildAllowedBundle extends NodeBundle<
    NodeChild,
    NodeChildBlueprint<T_ChildAllowedBundle>
  >,
>(
  molecule: unknown
): molecule is ChildAtom<T_ParentBundle, T_ChildAllowedBundle> {
  // return molecule instanceof NodeBlueprint<T_Node, T_NodeBlueprint>
  void molecule
  // throw new Error('Not implemented')
  return true
}
