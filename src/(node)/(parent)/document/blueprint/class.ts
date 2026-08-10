import { CommentBlueprint } from '../../../(child)/(characterData)/comment/blueprint/class.js'
import { DocumentTypeBlueprint } from '../../../(child)/documentType/blueprint/class.js'
import { backMethod } from '../../../../tool/(decorator)/(member)/method/back/function.js'
import { backProperty } from '../../../../tool/(decorator)/(member)/property/back/function.js'
import type { MoleculePath } from '../../../../tool/molecule/path/type.js'
import { NodeParentBlueprint } from '../../../parent/blueprint/class.js'
import { NodeParentChildValidator } from '../../../parent/child/validator/class.js'
import { DocumentBuilder } from '../builder/class.js'

export class DocumentBlueprint extends NodeParentBlueprint<
  [Document, DocumentBlueprint],
  [Comment, CommentBlueprint] | [DocumentType, DocumentTypeBlueprint]
> {
  private static _childValidator: NodeParentChildValidator<
    DocumentBlueprint,
    CommentBlueprint | DocumentTypeBlueprint
  >
  @backProperty
  override readonly nodeParentChildValidator: NodeParentChildValidator<
    DocumentBlueprint,
    CommentBlueprint | DocumentTypeBlueprint
  > = (DocumentBlueprint._childValidator ??=
    new NodeParentChildValidator<DocumentBlueprint>()
      .registerChildAllowed(CommentBlueprint, undefined)
      .registerChildAllowed(DocumentTypeBlueprint, undefined)
      ._lf())
  @backMethod override getBuilder({
    docSource,
    moleculePath,
  }: {
    docSource: {
      doc: Document
    }
    moleculePath?: MoleculePath | undefined
  }): DocumentBuilder {
    return new DocumentBuilder({
      docSource,
      moleculePath,
      nodeBlueprint: this,
      param: undefined,
    })
  }
  _test(): void {}
}
