import type { DocumentBound } from '../../(node)/(parent)/document/bound/type.js'
import { implementMethod } from '../../tool/(decorator)/(member)/method/implement/function.js'
import type { _lf } from '../../tool/_lf/interface.js'
import { MoleculePath } from '../../tool/molecule/path/class.js'
import type { NodeBlueprint } from '../blueprint/class.js'
import type { NodeBuilt } from '../built/class.js'
import type { NodeBundle } from '../bundle/type.js'
import type { NodeParamKeyOptional } from '../param/(key)/optional/type.js'
import type { NodeParamBundle } from '../param/bundle/type.js'
import type { NodeParam } from '../param/type.js'

export abstract class NodeBuilder<
  T_NodeBundle extends NodeBundle<Node, NodeBlueprint<T_NodeBundle>>,
  // TODO: check what happens when using ```keyof T_NodeParamBundle``` instead of ```NodeParamKeyOptional```
  T_NodeParamBundle extends NodeParamBundle<NodeParam, NodeParamKeyOptional>,
> implements _lf {
  readonly doc: Document
  readonly moleculePath: MoleculePath
  readonly nodeBlueprint: T_NodeBundle[1]
  readonly param: T_NodeParamBundle[0]
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
    nodeBlueprint: T_NodeBundle[1]
    param: T_NodeParamBundle[1][0] | undefined
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
  protected abstract createNode(param: DocumentBound): T_NodeBundle[0]
  protected abstract getParamDefault(): T_NodeParamBundle[1][1]
  /** @inheritdoc */
  @implementMethod('_lf') _lf(): this {
    return this
  }
}
