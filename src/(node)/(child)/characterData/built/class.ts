import { NodeBuilt } from '../../../../node/built/class.js'
import type { NodeBundle } from '../../../../node/bundle/type.js'
import type { NodeChildBuilt } from '../../../child/built/type.js'
import type { CharacterDataBlueprint } from '../blueprint/class.js'

export class CharacterDataBuilt<
  T_CharacterDataBlueprintBundle extends NodeBundle<
    CharacterData,
    CharacterDataBlueprint<T_CharacterDataBlueprintBundle>
  >,
>
  extends NodeBuilt<T_CharacterDataBlueprintBundle>
  implements NodeChildBuilt<T_CharacterDataBlueprintBundle> {}
