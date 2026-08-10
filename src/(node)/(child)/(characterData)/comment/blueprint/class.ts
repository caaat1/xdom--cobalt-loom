import { backMethod } from '../../../../../tool/(decorator)/(member)/method/back/function.js'
import type { PartialByKey } from '../../../../../tool/(object)/(partial)/by/key/type.js'
import type { MoleculePath } from '../../../../../tool/molecule/path/type.js'
import { CharacterDataBlueprint } from '../../../characterData/blueprint/class.js'
import type { CharacterDataParam } from '../../../characterData/param/type.js'
import { CommentBuilder } from '../builder/class.js'

export class CommentBlueprint extends CharacterDataBlueprint<
  [Comment, CommentBlueprint]
> {
  @backMethod override getBuilder({
    docSource,
    moleculePath,
    param,
  }: {
    docSource: {
      doc: Document
    }
    moleculePath?: MoleculePath | undefined
    param?: PartialByKey<CharacterDataParam, 'data'> | undefined
  }): CommentBuilder {
    return new CommentBuilder({
      docSource,
      moleculePath,
      nodeBlueprint: this,
      param,
    })
  }
}
