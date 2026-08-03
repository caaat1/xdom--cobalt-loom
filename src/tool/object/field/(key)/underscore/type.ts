export type ObjectPropertyKeyUnderscore<T> = {
  [K in keyof T as `_${string & K}_`]: T[K]
}
