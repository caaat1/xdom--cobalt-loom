import type { CommentBlueprint } from '../../../(child)/(characterData)/comment/blueprint/class.js'
import type { DocumentTypeBlueprint } from '../../../(child)/documentType/blueprint/class.js'
import { backMethod } from '../../../../tool/(decorator)/(member)/method/back/function.js'
import { NodeParentBuilder } from '../../../parent/builder/class.js'
import type { DocumentBlueprint } from '../blueprint/class.js'
import { DocumentBuilt } from '../built/class.js'
import type { DocumentParamBundle } from '../param/bundle/type.js'

export class DocumentBuilder extends NodeParentBuilder<
  [Document, DocumentBlueprint],
  [Comment, CommentBlueprint] | [DocumentType, DocumentTypeBlueprint],
  DocumentParamBundle
> {
  @backMethod protected override createNode({
    doc,
  }: {
    doc: Document
  }): Document {
    return doc
  }
  @backMethod
  protected override getParamDefault(): DocumentParamBundle[1][1] {
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
