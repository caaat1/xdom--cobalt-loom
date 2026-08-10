import { NodeBlueprint } from '../../../../node/blueprint/class.js'
import type { NodeBundle } from '../../../../node/bundle/type.js'
import type { PartialByKeyString } from '../../../../tool/(object)/(partial)/by/(key)/string/type.js'
import type { MoleculePath } from '../../../../tool/molecule/path/type.js'
import type { NodeChildBlueprint } from '../../../child/blueprint/type.js'
import type { CharacterDataBuilder } from '../builder/class.js'
import type { CharacterDataParam } from '../param/type.js'

export abstract class CharacterDataBlueprint<
  T_CharacterDataBlueprintBundle extends NodeBundle<
    CharacterData,
    CharacterDataBlueprint<T_CharacterDataBlueprintBundle>
  >,
>
  extends NodeBlueprint<T_CharacterDataBlueprintBundle>
  implements NodeChildBlueprint<T_CharacterDataBlueprintBundle>
{
  abstract override getBuilder({
    docSource,
    moleculePath,
    param,
  }: {
    docSource: {
      doc: Document
    }

    moleculePath?: MoleculePath | undefined
    param?: PartialByKeyString<CharacterDataParam, 'data'> | undefined
  }): CharacterDataBuilder<T_CharacterDataBlueprintBundle>
}
