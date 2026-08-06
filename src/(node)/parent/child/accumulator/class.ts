import type { NodeBundle } from '../../../../node/bundle/type.js'
import { isAmong } from '../../../../tool/unknown/among/is/function.js'
import { UserInputHandler } from '../../../../tool/user/input/handler/class.js'
import type { NodeChildBlueprint } from '../../../child/blueprint/type.js'
import type { NodeChild } from '../../../child/type.js'
import type { NodeParentBlueprint } from '../../blueprint/class.js'
import type { NodeParent } from '../../type.js'
import type { ChildMolecule } from '../molecule/type.js'

export class ChildAccumulator<
  T_ParentBundle extends NodeBundle<
    NodeParent,
    NodeParentBlueprint<T_ParentBundle, T_ChildAllowedBundle>
  >,
  T_ChildAllowedBundle extends NodeBundle<
    NodeChild,
    NodeChildBlueprint<T_ChildAllowedBundle>
  >,
> extends UserInputHandler<
  ChildMolecule<T_ParentBundle, T_ChildAllowedBundle>,
  T_ParentBundle[1]
> {
  protected canSetSafely(
    value: unknown
  ): value is ChildMolecule<T_ParentBundle, T_ChildAllowedBundle> {
    return !isAmong(value, [null, undefined])
  }
}
