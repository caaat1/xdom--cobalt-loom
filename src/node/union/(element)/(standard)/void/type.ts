import type { ElementStandardBranded } from '../../standard/branded/type.js'

import type { ElementStandardVoidTagName } from './tagName/type.js'

export type ElementStandardVoid = {
  [K in ElementStandardVoidTagName]: ElementStandardBranded<K>
}[ElementStandardVoidTagName]
