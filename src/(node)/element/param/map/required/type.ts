import type { ElementTagName } from '../../../tagName/type.js'

export type ElementParamMapRequired<T_ElementTagName extends ElementTagName> = {
  tagName: T_ElementTagName
}
