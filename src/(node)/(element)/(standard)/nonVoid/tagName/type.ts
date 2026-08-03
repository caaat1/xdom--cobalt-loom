import type { ElementStandardTagName } from '../../../standard/tagName/type.js'
import type { ElementStandardVoidTagName } from '../../void/tagName/type.js'

export type ElementStandardNonVoidTagName = Exclude<
  ElementStandardTagName,
  ElementStandardVoidTagName
>
