export type ExcludeUndefined<T> = {
  [K in keyof T]: Exclude<T[K], undefined>
}
