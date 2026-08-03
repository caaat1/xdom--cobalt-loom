import { InputHandlerOwned } from '../../../../../tool/input/(handler)/owned/class.js'
import { isAmong } from '../../../../../tool/unknown/is/among/function.js'
import type { NodeBundle } from '../../../../bundle/type.js'
import type { UnionChild } from '../../../../union/child/type.js'
import type { UnionParent } from '../../../../union/parent/type.js'
import type { NodeBlueprintChild } from '../../../child/type.js'
import type { NodeBlueprintParent } from '../../class.js'
import type { ChildMolecule } from '../molecule/type.js'

export class ChildAccumulator<
  T_ParentBundle extends NodeBundle<
    UnionParent,
    NodeBlueprintParent<T_ParentBundle, T_ChildAllowedBundle>
  >,
  T_ChildAllowedBundle extends NodeBundle<
    UnionChild,
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
