import type { NodeBuilder } from '../../../node/builder/class.js'
import type { NodeParamKeyPartial } from '../../../node/param/(key)/partial/type.js'
import type { NodeParamBundle } from '../../../node/param/bundle/type.js'
import type { NodeParam } from '../../../node/param/type.js'
import type { NodeElementBundle } from '../bundle/type.js'

export type NodeElementBuilder<
  T_NodeElementBundle extends NodeElementBundle<T_NodeElementBundle>,
  T_NodeElementParamBundle extends NodeParamBundle<
    NodeParam,
    NodeParamKeyPartial
  >,
> = NodeBuilder<T_NodeElementBundle, T_NodeElementParamBundle>
