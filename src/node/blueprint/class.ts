import type { _lf } from '../../tool/_lf/interface.js'
import type { MoleculePath } from '../../tool/molecule/path/type.js'
import type { NodeBuilder } from '../builder/class.js'
import type { NodeBundle } from '../bundle/alt/type.js'
import type { NodeParamMapBundle } from '../param/map/bundle/alt/type.js'
import type { NodeParamMapPartial } from '../param/map/partial/type.js'
import type { NodeParamMapRequired } from '../param/map/required/type.js'

export abstract class NodeBlueprint<
  T_NodeBundle extends NodeBundle<Node, NodeBlueprint<T_NodeBundle>>,
> implements _lf {
  abstract getBuilder({
    docSource,
    moleculePath,
  }: {
    docSource: {
      doc: Document
    }
    moleculePath?: MoleculePath | undefined
  }): NodeBuilder<
    T_NodeBundle,
    NodeParamMapBundle<NodeParamMapPartial, NodeParamMapRequired>
  >
  /** @inheritdoc */
  _lf(): this {
    return this
  }
}
