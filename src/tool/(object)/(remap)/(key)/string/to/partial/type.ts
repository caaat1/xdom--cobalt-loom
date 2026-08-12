import type { KeyString } from '../../../../../../object/(key)/string/type.js'
import type { RemapKeyToPartial } from '../../../../key/to/partial/type.js'

export type RemapKeyStringToPartial<
  T,
  K extends KeyString<T>,
> = RemapKeyToPartial<T, K>
