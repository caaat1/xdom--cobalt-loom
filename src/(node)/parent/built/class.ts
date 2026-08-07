import { NodeBuilt } from '../../../node/built/class.js'
import type { NodeChildBundle } from '../../child/bundle/type.js'
import type { NodeParentBundle } from '../bundle/type.js'

export abstract class NodeParentBuilt<
  T_NodeParentBundle extends NodeParentBundle<
    T_NodeParentBundle,
    T_NodeChildBundle
  >,
  T_NodeChildBundle extends NodeChildBundle<T_NodeChildBundle>,
> extends NodeBuilt<T_NodeParentBundle> {
  appendChildren({ childCollection }: { childCollection: [] }): this {
    void childCollection
    return this
  }
}
