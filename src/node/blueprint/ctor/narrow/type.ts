import type { CtorArgs } from '../../../../tool/ctor/args/type.js'
import type { NodeBundle } from '../../../bundle/type.js'
import type { NodeBlueprint } from '../../class.js'

export type NodeBlueprintCtorNarrow<
  T_NodeBundle extends NodeBundle<Node, NodeBlueprint<T_NodeBundle>>,
> = abstract new (...args: CtorArgs) => T_NodeBundle[1]
