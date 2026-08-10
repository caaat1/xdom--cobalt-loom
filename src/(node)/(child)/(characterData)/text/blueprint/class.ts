import { backMethod } from '../../../../../tool/(decorator)/(member)/method/back/function.js'
import type { PartialByKey } from '../../../../../tool/(object)/(partial)/by/key/type.js'
import type { MoleculePath } from '../../../../../tool/molecule/path/type.js'
import { CharacterDataBlueprint } from '../../../characterData/blueprint/class.js'
import type { CharacterDataParam } from '../../../characterData/param/type.js'
import { TextBuilder } from '../builder/class.js'
import type { TextBundle } from '../bundle/type.js'

export class TextBlueprint extends CharacterDataBlueprint<TextBundle> {
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
  }): TextBuilder {
    return new TextBuilder({
      docSource,
      moleculePath,
      nodeBlueprint: this,
      param,
    })
  }
}
