import { backMethod } from '../../../../../tool/(decorator)/(member)/method/back/function.js'
import { CharacterDataBuilder } from '../../../characterData/builder/class.js'
import type { TextBlueprint } from '../blueprint/class.js'
import { TextBuilt } from '../built/class.js'

export class TextBuilder extends CharacterDataBuilder<[Text, TextBlueprint]> {
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
