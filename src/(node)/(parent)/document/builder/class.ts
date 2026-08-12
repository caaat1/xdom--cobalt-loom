import type { CommentBundle } from '../../../(child)/(characterData)/comment/bundle/type.js'
import type { DocumentTypeBundle } from '../../../(child)/documentType/bundle/type.js'
import { backMethod } from '../../../../tool/(decorator)/(member)/method/back/function.js'
import { NodeParentBuilder } from '../../../parent/builder/class.js'
import { DocumentBuilt } from '../built/class.js'
import type { DocumentBundle } from '../bundle/type.js'
import type { DocumentParamMapBundle } from '../param/map/bundle/type.js'

export class DocumentBuilder extends NodeParentBuilder<
  DocumentBundle,
  CommentBundle | DocumentTypeBundle,
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
