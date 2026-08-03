import type { ElementStandardBranded } from './branded/type.js'
import type { ElementStandardTagName } from './tagName/type.js'

export type ElementStandard = {
  [K in ElementStandardTagName]: ElementStandardBranded<K>
}[ElementStandardTagName]
