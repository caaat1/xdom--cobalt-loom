export type ValidatorCb<T_NodeBlueprintParent, T_NodeBlueprintChild> = ({
  nodeBlueprintParent,
  nodeBlueprintChild,
}: {
  nodeBlueprintParent: T_NodeBlueprintParent
  nodeBlueprintChild: T_NodeBlueprintChild
}) => boolean
