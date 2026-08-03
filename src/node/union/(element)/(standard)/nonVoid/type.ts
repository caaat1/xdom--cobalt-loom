import type { ElementStandardBranded } from '../../standard/branded/type.js'

import type { ElementStandardNonVoidTagName } from './tagName/type.js'

export type ElementStandardNonVoid = {
  [K in ElementStandardNonVoidTagName]: ElementStandardBranded<K>
}[ElementStandardNonVoidTagName]
