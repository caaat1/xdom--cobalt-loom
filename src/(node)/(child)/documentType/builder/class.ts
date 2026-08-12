import { NodeBuilder } from '../../../../node/builder/class.js'
import { backMethod } from '../../../../tool/(decorator)/(member)/method/back/function.js'
import type { NodeChildBuilder } from '../../../child/builder/type.js'
import { DocumentTypeBuilt } from '../built/class.js'
import type { DocumentTypeBundle } from '../bundle/type.js'
import type { DocumentTypeParamMapBundle } from '../param/map/bundle/type.js'

export class DocumentTypeBuilder
  extends NodeBuilder<DocumentTypeBundle, DocumentTypeParamMapBundle>
  implements NodeChildBuilder<DocumentTypeBundle, DocumentTypeParamMapBundle>
{
  @backMethod protected override createNode({
    doc,
  }: {
    doc: Document
  }): DocumentType {
    const { qualifiedName, publicId, systemId } = this.param
    return doc.implementation.createDocumentType(
      qualifiedName,
      publicId,
      systemId
    )
  }
  @backMethod
  protected override getParamDefault(): DocumentTypeParamMapBundle['default'] {
    return {
      qualifiedName: 'html',
      publicId: '',
      systemId: '',
    }
  }
  @backMethod
  protected override build(): DocumentTypeBuilt {
    const node = this.createNode({ doc: this.doc })
    return new DocumentTypeBuilt({
      moleculePath: this.moleculePath,
      node,
      nodeBlueprint: this.nodeBlueprint,
    })
  }
}
