import type { NodeChildBundle } from '../../../../child/bundle/type.js'
import type { NodeParentBundle } from '../../../bundle/type.js'
import type { NodeParentChildAtom } from '../type.js'

export function isNodeParentChildAtom<
  T_NodeParentBundle extends NodeParentBundle<
    T_NodeParentBundle,
    T_NodeChildBundle
  >,
  T_NodeChildBundle extends NodeChildBundle<T_NodeChildBundle>,
>(
  molecule: unknown
): molecule is NodeParentChildAtom<T_NodeParentBundle, T_NodeChildBundle> {
  // return molecule instanceof NodeBlueprint<T_Node, T_NodeBlueprint>
  void molecule
  // throw new Error('Not implemented')
  return true
}
