import type { ExcludeUndefined } from '../../../../../tool/(object)/(exclude)/undefined/type.js'
import type { NodeParamMapPartial } from '../../partial/type.js'
import type { NodeParamMapRequired } from '../../required/type.js'

export type NodeParamMapBundle<
  T_NodeParamMapPartial extends NodeParamMapPartial,
  T_NodeParamMapRequired extends NodeParamMapRequired,
> = {
  default: Required<ExcludeUndefined<T_NodeParamMapPartial>>
  partial: T_NodeParamMapPartial
  required: T_NodeParamMapRequired
}
