import { isAmong } from '../../../../tool/unknown/among/is/function.js'
import { UserInputHandler } from '../../../../tool/user/input/handler/class.js'
import type { NodeChildBundle } from '../../../child/bundle/type.js'
import type { NodeParentBundle } from '../../bundle/type.js'
import type { NodeParentChildMolecule } from '../molecule/type.js'

export class NodeParentChildAccumulator<
  T_NodeParentBundle extends NodeParentBundle<
    T_NodeParentBundle,
    T_NodeChildBundle
  >,
  T_NodeChildBundle extends NodeChildBundle<T_NodeChildBundle>,
> extends UserInputHandler<
  NodeParentChildMolecule<T_NodeParentBundle, T_NodeChildBundle>,
  T_NodeParentBundle[1]
> {
  protected override canSetSafely(
    value: unknown
  ): value is NodeParentChildMolecule<T_NodeParentBundle, T_NodeChildBundle> {
    return !isAmong(value, [null, undefined])
  }
}
