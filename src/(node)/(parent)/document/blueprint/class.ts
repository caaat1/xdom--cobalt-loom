import { CommentBlueprint } from '../../../(child)/(characterData)/comment/blueprint/class.js'
import { DocumentTypeBlueprint } from '../../../(child)/documentType/blueprint/class.js'
import { backMethod } from '../../../../tool/(decorator)/(member)/method/back/function.js'
import { backProperty } from '../../../../tool/(decorator)/(member)/property/back/function.js'
import type { MoleculePath } from '../../../../tool/molecule/path/type.js'
import { NodeParentBlueprint } from '../../../parent/blueprint/class.js'
import { DocumentBuilder } from '../builder/class.js'
import type { DocumentBundle } from '../bundle/type.js'

export class DocumentBlueprint extends NodeParentBlueprint<
  DocumentBundle['parent'],
  DocumentBundle['child']
> {
  @backProperty
  protected override readonly _childAllowed = this.childValidator
    .registerChildAllowed(CommentBlueprint, undefined)
    .registerChildAllowed(DocumentTypeBlueprint, undefined)
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
