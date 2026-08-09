import type { NodeBuilt } from '../../../node/built/class.js'
import type { NodeElementBundle } from '../bundle/type.js'

export type NodeElementBuilt<
  T_NodeElementBundle extends NodeElementBundle<T_NodeElementBundle>,
> = NodeBuilt<T_NodeElementBundle>
