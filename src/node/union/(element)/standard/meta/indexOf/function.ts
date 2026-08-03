import { elementStandardNonVoidMeta } from '../../../(standard)/nonVoid/meta/const.js'
import { elementStandardVoidMeta } from '../../../(standard)/void/meta/const.js'
import type { ElementStandardTagName } from '../../tagName/type.js'

/** Returns the 1-based alphabetical position of a tag name within the standard element set. */
export function getElementStandardMetaIndexOf(
  tagName: ElementStandardTagName
): number {
  return (
    [
      ...Object.keys(elementStandardVoidMeta),
      ...Object.keys(elementStandardNonVoidMeta),
    ]
      .sort()
      .indexOf(tagName) + 1
  )
}
