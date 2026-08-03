import type { NodeElement } from '../../../(node)/element/type.js'
import type { NodeBlueprint } from '../../blueprint/class.js'
import type { NodeBundle } from '../../bundle/type.js'

export type NodeBlueprintElement<
  T_ElementBundle extends NodeBundle<
    NodeElement,
    NodeBlueprintElement<T_ElementBundle>
  >,
> = NodeBlueprint<T_ElementBundle>
