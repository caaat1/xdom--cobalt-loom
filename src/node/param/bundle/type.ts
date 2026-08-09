import type { NodeParamKeyPartial } from '../(key)/partial/type.js'
import type { PartialByKey } from '../../../tool/(object)/(partial)/by/key/type.js'
import type { NodeParam } from '../type.js'

export type NodeParamBundle<
  T_NodeParam extends NodeParam,
  T_NodeParamKeyPartial extends NodeParamKeyPartial,
> = [
  obj: T_NodeParam,
  partial: [
    byKey: PartialByKey<T_NodeParam, T_NodeParamKeyPartial>,
    defaults: Pick<T_NodeParam, T_NodeParamKeyPartial>,
    key: T_NodeParamKeyPartial,
  ],
]
