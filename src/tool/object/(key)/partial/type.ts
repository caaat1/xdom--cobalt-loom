export type KeyPartial<T> = {
  [K in keyof T]-?: Partial<Pick<T, K>> extends Pick<T, K> ? K : never
}[keyof T]
