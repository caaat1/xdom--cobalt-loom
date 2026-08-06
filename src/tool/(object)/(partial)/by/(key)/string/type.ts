import type { KeyString } from '../../../../../object/property/(key)/string/type.js'
import type { PartialByKey } from '../../key/type.js'

export type PartialByKeyString<T, K extends KeyString<T>> = PartialByKey<T, K>
