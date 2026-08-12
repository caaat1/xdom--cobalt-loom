import type { NodeParamMapBundle } from '../../../../../../node/param/map/bundle/alt/type.js'
import type { CharacterDataParamMapPartial } from '../partial/type.js'
import type { CharacterDataParamMapRequired } from '../required/type.js'

export type CharacterDataParamMapBundle = NodeParamMapBundle<
  CharacterDataParamMapPartial,
  CharacterDataParamMapRequired
>
