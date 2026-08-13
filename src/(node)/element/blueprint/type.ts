import type { NodeBlueprint } from '../../../node/blueprint/class.js'
import type { NodeElementBundle } from '../bundle/type.js'

export type NodeElementBlueprint<
  T_NodeElementBundle extends NodeElementBundle<T_NodeElementBundle>,
> = NodeBlueprint<T_NodeElementBundle>
