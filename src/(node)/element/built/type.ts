import type { NodeBuilt } from '../../../node/built/class.js'
import type { NodeElementBundle } from '../bundle/type.js'

export type NodeElementBuilt<
  T_ElementBundle extends NodeElementBundle<T_ElementBundle>,
> = NodeBuilt<T_ElementBundle>
