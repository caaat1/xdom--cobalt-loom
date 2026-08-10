import { backMethod } from '../../../../../tool/(decorator)/(member)/method/back/function.js'
import { CharacterDataBuilder } from '../../../characterData/builder/class.js'
import { CommentBuilt } from '../built/class.js'
import type { CommentBundle } from '../bundle/type.js'

export class CommentBuilder extends CharacterDataBuilder<CommentBundle> {
  @backMethod protected override getFactory(
    doc: Document
  ): (data: string) => Comment {
    return doc.createComment.bind(doc)
  }
  @backMethod protected override build(): CommentBuilt {
    const node = this.createNode({ doc: this.doc })
    return new CommentBuilt({
      moleculePath: this.moleculePath,
      node,
      nodeBlueprint: this.nodeBlueprint,
    })
  }
}
