import type { NodeChild } from '../../../../../(node)/child/type.js'
import type { NodeParent } from '../../../../../(node)/parent/type.js'
import { InputHandlerOwned } from '../../../../../tool/input/(handler)/owned/class.js'
import { isAmong } from '../../../../../tool/unknown/among/is/function.js'
import type { NodeBundle } from '../../../../bundle/type.js'
import type { NodeBlueprintChild } from '../../../child/type.js'
import type { NodeBlueprintParent } from '../../class.js'
import type { ChildMolecule } from '../molecule/type.js'

export class ChildAccumulator<
  T_ParentBundle extends NodeBundle<
    NodeParent,
    NodeBlueprintParent<T_ParentBundle, T_ChildAllowedBundle>
  >,
  T_ChildAllowedBundle extends NodeBundle<
    NodeChild,
    NodeBlueprintChild<T_ChildAllowedBundle>
  >,
> extends InputHandlerOwned<
  ChildMolecule<T_ParentBundle, T_ChildAllowedBundle>,
  T_ParentBundle[1]
> {
  protected canSetSafely(
    value: unknown
  ): value is ChildMolecule<T_ParentBundle, T_ChildAllowedBundle> {
    return !isAmong(value, [null, undefined])
  }
}
