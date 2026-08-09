import { NodeBuilder } from '../../../node/builder/class.js'
import type { NodeParamKeyPartial } from '../../../node/param/(key)/partial/type.js'
import type { NodeParamBundle } from '../../../node/param/bundle/type.js'
import type { NodeParam } from '../../../node/param/type.js'
import type { NodeChildBundle } from '../../child/bundle/type.js'
import type { NodeParentBundle } from '../bundle/type.js'

export abstract class NodeParentBuilder<
  T_NodeParentBundle extends NodeParentBundle<
    T_NodeParentBundle,
    T_NodeChildBundle
  >,
  T_NodeChildBundle extends NodeChildBundle<T_NodeChildBundle>,
  T_NodeParentParamBundle extends NodeParamBundle<
    NodeParam,
    NodeParamKeyPartial
  >,
> extends NodeBuilder<T_NodeParentBundle, T_NodeParentParamBundle> {
  protected buildChildren({ node }: { node: T_NodeParentBundle[0] }): [] {
    void node
    return []
  }
}
