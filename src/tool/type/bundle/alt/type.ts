import type { TypeDescription } from '../../description/type.js'

export type TypeBundle<T> = [
  isType: (value: unknown) => value is T,
  typeDescription: TypeDescription,
]
