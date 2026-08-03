import type { ElementCustomTagName } from './tagName/type.js'

export type ElementCustom = HTMLElement & {
  readonly _xDomTagName_: 'disableDomDiscriminants' extends keyof XDomConfig
    ? string
    : ElementCustomTagName
}
