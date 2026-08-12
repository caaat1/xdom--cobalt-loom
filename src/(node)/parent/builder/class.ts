import { NodeBuilder } from '../../../node/builder/class.js'
import type { NodeParamMapBundle } from '../../../node/param/map/bundle/alt/type.js'
import type { NodeParamMapPartial } from '../../../node/param/map/partial/type.js'
import type { NodeParamMapRequired } from '../../../node/param/map/required/type.js'
import type { NodeChildBundle } from '../../child/bundle/type.js'
import type { NodeParentBundle } from '../bundle/type.js'

export abstract class NodeParentBuilder<
  T_NodeParentBundle extends NodeParentBundle<
    T_NodeParentBundle,
    T_NodeChildBundle
  >,
  T_NodeChildBundle extends NodeChildBundle<T_NodeChildBundle>,
  T_NodeParamMapBundle extends NodeParamMapBundle<
    NodeParamMapPartial,
    NodeParamMapRequired
  >,
> extends NodeBuilder<T_NodeParentBundle, T_NodeParamMapBundle> {
  protected buildChildren({ node }: { node: T_NodeParentBundle['node'] }): [] {
    void node
    return []
  }
}
