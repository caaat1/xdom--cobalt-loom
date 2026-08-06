import type { NodeParamKeyOptional } from '../(key)/optional/type.js'
import type { PartialByKey } from '../../../tool/(object)/(partial)/by/key/type.js'
import type { NodeParam } from '../type.js'

export type NodeParamBundle<
  T_NodeParam extends NodeParam,
  T_NodeParamKeyOptional extends NodeParamKeyOptional,
> = [
  obj: T_NodeParam,
  optional: [
    partially: PartialByKey<T_NodeParam, T_NodeParamKeyOptional>,
    defaults: Pick<T_NodeParam, T_NodeParamKeyOptional>,
    key: T_NodeParamKeyOptional,
  ],
]
