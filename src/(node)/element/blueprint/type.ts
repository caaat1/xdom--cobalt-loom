import type { NodeBlueprint } from '../../../node/blueprint/class.js'
import type { NodeBundle } from '../../../node/bundle/type.js'
import type { NodeElement } from '../type.js'

export type NodeElementBlueprint<
  T_ElementBundle extends NodeBundle<
    NodeElement,
    NodeElementBlueprint<T_ElementBundle>
  >,
> = NodeBlueprint<T_ElementBundle>
