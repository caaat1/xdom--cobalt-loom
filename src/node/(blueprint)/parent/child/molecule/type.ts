import type { Molecule } from '../../../../../tool/molecule/type.js'
import type { Stringifiable } from '../../../../../tool/stringifiable/type.js'
import type { NodeBundle } from '../../../../bundle/type.js'
import type { UnionChild } from '../../../../union/child/type.js'
import type { UnionParent } from '../../../../union/parent/type.js'
import type { NodeBlueprintChild } from '../../../child/type.js'
import type { NodeBlueprintParent } from '../../class.js'
import type { ChildAtom } from '../atom/type.js'

export type ChildMolecule<
  T_ParentBundle extends NodeBundle<
    UnionParent,
    NodeBlueprintParent<T_ParentBundle, T_ChildAllowedBundle>
  >,
  T_ChildAllowedBundle extends NodeBundle<
    UnionChild,
    NodeBlueprintChild<T_ChildAllowedBundle>
  >,
> = Molecule<ChildAtom<T_ParentBundle, T_ChildAllowedBundle>, Stringifiable>
