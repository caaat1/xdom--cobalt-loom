import type { RemapKeyToUnderscored } from '../type.js'

export type RemapKeyToUnderscoredDeep<T> = T extends (
  ...args: unknown[]
) => unknown
  ? T
  : T extends readonly unknown[]
    ? { [K in keyof T]: RemapKeyToUnderscoredDeep<T[K]> }
    : T extends object
      ? RemapKeyToUnderscored<{
          [K in keyof T]: RemapKeyToUnderscoredDeep<T[K]>
        }>
      : T
