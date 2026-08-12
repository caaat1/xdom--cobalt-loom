import type { NodeParamMapBundle } from '../../../../../node/param/map/bundle/alt/type.js'
import type { ElementTagName } from '../../../tagName/type.js'
import type { ElementParamMapPartial } from '../partial/type.js'
import type { ElementParamMapRequired } from '../required/type.js'

export type ElementParamMapBundle<
  T_ElementTagName extends ElementTagName,
  T_NodeParamMapPartial extends ElementParamMapPartial,
  T_NodeParamMapRequired extends ElementParamMapRequired<T_ElementTagName>,
> = NodeParamMapBundle<T_NodeParamMapPartial, T_NodeParamMapRequired>
