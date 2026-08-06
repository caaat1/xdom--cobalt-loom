export type ObjectPropertyKeyUnderscoreDeep<T> = T extends (
  ...args: unknown[]
) => unknown
  ? T
  : T extends readonly unknown[]
    ? { [K in keyof T]: ObjectPropertyKeyUnderscoreDeep<T[K]> }
    : T extends object
      ? {
          [
            K in keyof T as K extends string | number ? `_${K}_` : K
          ]: ObjectPropertyKeyUnderscoreDeep<T[K]>
        }
      : T
