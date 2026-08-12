import type { NodeParamMapBundle } from '../../../../../../node/param/map/bundle/alt/type.js'
import type { DocumentParamMapPartial } from '../partial/type.js'
import type { DocumentParamMapRequired } from '../required/type.js'

export type DocumentParamMapBundle = NodeParamMapBundle<
  DocumentParamMapPartial,
  DocumentParamMapRequired
>
