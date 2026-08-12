import { NodeBlueprint } from '../../../../node/blueprint/class.js'
import type { NodeBundle } from '../../../../node/bundle/alt/type.js'
import type { MoleculePath } from '../../../../tool/molecule/path/type.js'
import type { NodeChildBlueprint } from '../../../child/blueprint/type.js'
import type { CharacterDataBuilder } from '../builder/class.js'
import type { CharacterDataParamMapPartial } from '../param/map/partial/type.js'

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
    param?: CharacterDataParamMapPartial | undefined
  }): CharacterDataBuilder<T_CharacterDataBlueprintBundle>
}
