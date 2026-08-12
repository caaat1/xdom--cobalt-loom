import type { RemapKeyToPartial } from '../../type.js'

export type RemapKeyToPartialByString<T, K extends keyof T> = RemapKeyToPartial<
  T,
  Extract<K, string>
>
