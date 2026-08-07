import { implementMethod } from '../../tool/(decorator)/(member)/method/implement/function.js'
import type { _lf } from '../../tool/_lf/interface.js'
import type { MoleculePath } from '../../tool/molecule/path/type.js'
import type { NodeBlueprint } from '../blueprint/class.js'
import type { NodeBundle } from '../bundle/type.js'

export class NodeBuilt<
  T_NodeBlueprintBundle extends NodeBundle<
    Node,
    NodeBlueprint<T_NodeBlueprintBundle>
  >,
> implements _lf {
  readonly moleculePath: MoleculePath
  readonly node: T_NodeBlueprintBundle[0]
  readonly nodeBlueprint: T_NodeBlueprintBundle[1]
  constructor({
    moleculePath,
    node,
    nodeBlueprint,
  }: {
    moleculePath: MoleculePath
    node: T_NodeBlueprintBundle[0]
    nodeBlueprint: T_NodeBlueprintBundle[1]
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
