import type { NodeBundle } from '../../../node/bundle/type.js'
import type { NodeElementBlueprint } from '../blueprint/type.js'
import type { NodeElement } from '../type.js'

export type NodeElementBundle<
  T_NodeElementBundle extends NodeElementBundle<T_NodeElementBundle>,
> = NodeBundle<NodeElement, NodeElementBlueprint<T_NodeElementBundle>>
