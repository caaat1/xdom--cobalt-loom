import type { NodeBuilder } from '../../../node/builder/class.js'
import type { NodeParamKeyOptional } from '../../../node/param/(key)/optional/type.js'
import type { NodeParamBundle } from '../../../node/param/bundle/type.js'
import type { NodeParam } from '../../../node/param/type.js'
import type { NodeElementBundle } from '../bundle/type.js'

export type NodeElementBuilder<
  T_ElementBundle extends NodeElementBundle<T_ElementBundle>,
  T_NodeElementParamBundle extends NodeParamBundle<
    NodeParam,
    NodeParamKeyOptional
  >,
> = NodeBuilder<T_ElementBundle, T_NodeElementParamBundle>
