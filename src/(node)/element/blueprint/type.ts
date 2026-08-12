import type { NodeBlueprint } from '../../../node/blueprint/class.js'
import type { NodeBundle } from '../../../node/bundle/alt/type.js'
import type { NodeElement } from '../type.js'

export type NodeElementBlueprint<
  T_NodeElementBundle extends NodeBundle<
    NodeElement,
    NodeElementBlueprint<T_NodeElementBundle>
  >,
> = NodeBlueprint<T_NodeElementBundle>
