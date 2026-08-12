export type ObjectMerge<T, P extends keyof T, U> = T[P] extends object
  ? T[P] & U
  : T[P]
