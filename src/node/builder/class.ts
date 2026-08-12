import type { DocumentBound } from '../../(node)/(parent)/document/bound/type.js'
import { implementMethod } from '../../tool/(decorator)/(member)/method/implement/function.js'
import type { _lf } from '../../tool/_lf/interface.js'
import { MoleculePath } from '../../tool/molecule/path/class.js'
import type { NodeBlueprint } from '../blueprint/class.js'
import type { NodeBuilt } from '../built/class.js'
import type { NodeBundle } from '../bundle/alt/type.js'
import type { NodeParamMapPartialDefault } from '../param/map/(partial)/default/type.js'
import type { NodeParamMapBundle } from '../param/map/bundle/alt/type.js'
import type { NodeParamMapRequired } from '../param/map/required/type.js'

export abstract class NodeBuilder<
  T_NodeBundle extends NodeBundle<Node, NodeBlueprint<T_NodeBundle>>,
  T_NodeParamMapBundle extends NodeParamMapBundle<
    NodeParamMapPartialDefault,
    NodeParamMapRequired
  >,
> implements _lf {
  readonly doc: Document
  readonly moleculePath: MoleculePath
  readonly nodeBlueprint: T_NodeBundle['nodeBlueprint']
  readonly param: T_NodeParamMapBundle['default'] &
    T_NodeParamMapBundle['required']
  constructor({
    docSource,
    moleculePath,
    nodeBlueprint,
    param,
  }: {
    docSource: {
      doc: Document
    }
    moleculePath?: MoleculePath | undefined
    nodeBlueprint: T_NodeBundle['nodeBlueprint']
    param?: T_NodeParamMapBundle['partial'] | undefined
    // separate with param:
    // OR: param: T_NodeParamMapBundle // of partial and required
  }) {
    this.doc = docSource.doc
    this.moleculePath = moleculePath ?? new MoleculePath()
    this.nodeBlueprint = nodeBlueprint
    this.param = {
      ...this.getParamDefault(),
      ...param,
    }
  }
  protected abstract build(): NodeBuilt<T_NodeBundle>
  protected abstract createNode(param: DocumentBound): T_NodeBundle['node']
  protected abstract getParamDefault(): T_NodeParamMapBundle['default']

  /** @inheritdoc */
  @implementMethod('_lf') _lf(): this {
    return this
  }
}
