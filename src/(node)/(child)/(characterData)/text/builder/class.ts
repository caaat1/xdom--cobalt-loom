import { backMethod } from '../../../../../tool/(decorator)/(member)/method/back/function.js'
import { CharacterDataBuilder } from '../../../characterData/builder/class.js'
import { TextBuilt } from '../built/class.js'
import type { TextBundle } from '../bundle/type.js'

export class TextBuilder extends CharacterDataBuilder<TextBundle> {
  @backMethod protected override getFactory(
    doc: Document
  ): (data: string) => Text {
    return doc.createTextNode.bind(doc)
  }
  @backMethod protected override build(): TextBuilt {
    const node = this.createNode({ doc: this.doc })
    return new TextBuilt({
      moleculePath: this.moleculePath,
      node,
      nodeBlueprint: this.nodeBlueprint,
    })
  }
}
