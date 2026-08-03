import type { NodeBlueprint } from '../../blueprint/class.js'
import type { NodeBundle } from '../../bundle/type.js'
import type { UnionElement } from '../../union/element/type.js'

export type NodeBlueprintElement<
  T_ElementBundle extends NodeBundle<
    UnionElement,
    NodeBlueprintElement<T_ElementBundle>
  >,
> = NodeBlueprint<T_ElementBundle>
