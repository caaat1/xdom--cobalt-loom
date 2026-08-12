import type { NodeParamMapPartial } from './partial/type.js'
import type { NodeParamMapRequired } from './required/type.js'

export type NodeParamMap<
  T_NodeParamMapPartial extends NodeParamMapPartial,
  T_NodeParamMapRequired extends NodeParamMapRequired,
> = T_NodeParamMapPartial & T_NodeParamMapRequired
// export type NodeParamMapAlt = NodeParamMapPartial & NodeParamMapRequired
