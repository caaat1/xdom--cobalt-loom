export type NodeParentValidatorCb<T_NodeParentBlueprint, T_NodeChildBlueprint> =
  ({
    nodeParentBlueprint,
    nodeChildBlueprint,
  }: {
    nodeParentBlueprint: T_NodeParentBlueprint
    nodeChildBlueprint: T_NodeChildBlueprint
  }) => boolean
