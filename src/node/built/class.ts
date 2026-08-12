import { implementMethod } from '../../tool/(decorator)/(member)/method/implement/function.js'
import type { _lf } from '../../tool/_lf/interface.js'
import type { MoleculePath } from '../../tool/molecule/path/type.js'
import type { NodeBlueprint } from '../blueprint/class.js'
import type { NodeBundle } from '../bundle/alt/type.js'

export class NodeBuilt<
  T_NodeBundle extends NodeBundle<Node, NodeBlueprint<T_NodeBundle>>,
> implements _lf {
  readonly moleculePath: MoleculePath
  readonly node: T_NodeBundle['node']
  readonly nodeBlueprint: T_NodeBundle['nodeBlueprint']
  constructor({
    moleculePath,
    node,
    nodeBlueprint,
  }: {
    moleculePath: MoleculePath
    node: T_NodeBundle['node']
    nodeBlueprint: T_NodeBundle['nodeBlueprint']
  }) {
    this.moleculePath = moleculePath
    this.node = node
    this.nodeBlueprint = nodeBlueprint
  }
  /** @inheritdoc */
  @implementMethod('_lf') _lf(): this {
    return this
  }
}
