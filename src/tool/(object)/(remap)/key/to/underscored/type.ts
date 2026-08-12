export type RemapKeyToUnderscored<T> = {
  [K in keyof T as K extends string | number ? `_${K}_` : K]: T[K]
}
