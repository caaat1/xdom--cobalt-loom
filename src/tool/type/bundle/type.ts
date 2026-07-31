import type { TypeDescription } from '../description/type.js'

export type TypeBundle<T> = {
  description: TypeDescription
  isType: (value: unknown) => value is T
}
