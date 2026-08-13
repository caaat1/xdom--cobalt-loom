import { backMethod } from '../../../../tool/(decorator)/(member)/method/back/function.js'
import { NodeParentBuilder } from '../../../parent/builder/class.js'
import { DocumentBuilt } from '../built/class.js'
import type { DocumentBundle } from '../bundle/type.js'
import type { DocumentParamMapBundle } from '../param/map/bundle/type.js'

export class DocumentBuilder extends NodeParentBuilder<
  DocumentBundle['parent'],
  DocumentBundle['child'],
  DocumentParamMapBundle
> {
  @backMethod protected override createNode({
    doc,
  }: {
    doc: Document
  }): Document {
    return doc
  }
  @backMethod
  protected override getParamDefault(): DocumentParamMapBundle['default'] {
    return {}
  }
  @backMethod protected override build(): DocumentBuilt {
    const node = this.createNode({ doc: this.doc })
    const childCollection = this.buildChildren({ node })
    return new DocumentBuilt({
      moleculePath: this.moleculePath,
      node,
      nodeBlueprint: this.nodeBlueprint,
    }).appendChildren({ childCollection })
  }
}
