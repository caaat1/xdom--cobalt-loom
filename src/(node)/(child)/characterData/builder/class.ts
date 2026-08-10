import { NodeBuilder } from '../../../../node/builder/class.js'
import type { NodeBundle } from '../../../../node/bundle/type.js'
import { backMethod } from '../../../../tool/(decorator)/(member)/method/back/function.js'
import type { NodeChildBuilder } from '../../../child/builder/type.js'
import type { CharacterDataBlueprint } from '../blueprint/class.js'
import type { CharacterDataParamBundle } from '../param/bundle/type.js'

export abstract class CharacterDataBuilder<
  T_CharacterDataBlueprintBundle extends NodeBundle<
    CharacterData,
    CharacterDataBlueprint<T_CharacterDataBlueprintBundle>
  >,
>
  extends NodeBuilder<T_CharacterDataBlueprintBundle, CharacterDataParamBundle>
  implements
    NodeChildBuilder<T_CharacterDataBlueprintBundle, CharacterDataParamBundle>
{
  @backMethod protected override createNode({
    doc,
  }: {
    doc: Document
  }): T_CharacterDataBlueprintBundle[0] {
    const { data } = this.param
    return this.getFactory(doc)(data)
  }
  @backMethod
  protected override getParamDefault(): CharacterDataParamBundle[1][1] {
    return {
      data: '',
    }
  }
  protected abstract getFactory(
    doc: Document
  ): (data: string) => ReturnType<typeof this.createNode>
}
