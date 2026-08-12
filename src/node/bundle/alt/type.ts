import type { NodeBlueprint } from '../../blueprint/class.js'

export type NodeBundle<
  T_Node extends Node,
  T_NodeBlueprint extends NodeBlueprint<NodeBundle<T_Node, T_NodeBlueprint>>,
> = {
  node: T_Node
  nodeBlueprint: T_NodeBlueprint
}
