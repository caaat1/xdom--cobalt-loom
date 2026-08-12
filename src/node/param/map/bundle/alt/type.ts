import type { NodeParamMapPartial } from '../../partial/type.js'
import type { NodeParamMapRequired } from '../../required/type.js'

export type NodeParamMapBundle<
  T_NodeParamMapPartial extends NodeParamMapPartial,
  T_NodeParamMapRequired extends NodeParamMapRequired,
> = {
  default: Required<T_NodeParamMapPartial>
  partial: T_NodeParamMapPartial
  required: T_NodeParamMapRequired
}
