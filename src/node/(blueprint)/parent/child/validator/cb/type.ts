export type ValidatorCb<T_ParentUnionBlueprint, T_ChildUnionBlueprint> = ({
  xDomParentUnion,
  xDomChildUnion,
}: {
  xDomParentUnion: T_ParentUnionBlueprint
  xDomChildUnion: T_ChildUnionBlueprint
}) => boolean
