import { NodeBlueprint } from '../../../../node/blueprint/class.js'
import { backMethod } from '../../../../tool/(decorator)/(member)/method/back/function.js'
import type { MoleculePath } from '../../../../tool/molecule/path/type.js'
import type { NodeChildBlueprint } from '../../../child/blueprint/type.js'
import { DocumentTypeBuilder } from '../builder/class.js'
import type { DocumentTypeBundle } from '../bundle/type.js'
import type { DocumentTypeParamBundle } from '../param/bundle/type.js'

export class DocumentTypeBlueprint
  extends NodeBlueprint<DocumentTypeBundle>
  implements NodeChildBlueprint<DocumentTypeBundle>
{
  @backMethod override getBuilder({
    docSource,
    moleculePath,
    param,
  }: {
    docSource: {
      doc: Document
    }

    moleculePath?: MoleculePath | undefined
    param?: DocumentTypeParamBundle[1][0] | undefined
  }): DocumentTypeBuilder {
    return new DocumentTypeBuilder({
      docSource,
      moleculePath,
      nodeBlueprint: this,
      param,
    })
  }
}
