import type { KeyString } from '../../../../../object/field/(key)/string/type.js'

export type PartialByKeyString<T, K extends KeyString<T>> = Omit<T, K> &
  Partial<Pick<T, K>>
