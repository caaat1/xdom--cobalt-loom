import type { ObjectMerge } from '../merge/type.js'

export type ObjectExtend<T, K extends keyof T, U> = Omit<T, K> &
  (Pick<T, K> extends Required<Pick<T, K>>
    ? { [P in K]: ObjectMerge<T, P, U> }
    : { [P in K]?: ObjectMerge<T, P, U> })
