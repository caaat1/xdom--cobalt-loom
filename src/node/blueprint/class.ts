import type { _lf } from '../../tool/_lf/interface.js'
import type { MoleculePath } from '../../tool/molecule/path/type.js'
import type { NodeBuilder } from '../builder/class.js'
import type { NodeBundle } from '../bundle/type.js'
import type { NodeParamKeyPartial } from '../param/(key)/partial/type.js'
import type { NodeParamBundle } from '../param/bundle/type.js'
import type { NodeParam } from '../param/type.js'

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
  }): NodeBuilder<T_NodeBundle, NodeParamBundle<NodeParam, NodeParamKeyPartial>>
  /** @inheritdoc */
  _lf(): this {
    return this
  }
}
