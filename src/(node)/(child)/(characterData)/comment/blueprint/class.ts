import { backMethod } from '../../../../../tool/(decorator)/(member)/method/back/function.js'
import type { MoleculePath } from '../../../../../tool/molecule/path/type.js'
import { CharacterDataBlueprint } from '../../../characterData/blueprint/class.js'
import type { CharacterDataParamMapPartial } from '../../../characterData/param/map/partial/type.js'
import { CommentBuilder } from '../builder/class.js'
import type { CommentBundle } from '../bundle/type.js'

export class CommentBlueprint extends CharacterDataBlueprint<CommentBundle> {
  @backMethod override getBuilder({
    docSource,
    moleculePath,
    param,
  }: {
    docSource: {
      doc: Document
    }
    moleculePath?: MoleculePath | undefined
    param?: CharacterDataParamMapPartial | undefined
  }): CommentBuilder {
    return new CommentBuilder({
      docSource,
      moleculePath,
      nodeBlueprint: this,
      param,
    })
  }
}
