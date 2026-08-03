import type { ElementStandardLibMap } from '../libMap/type.js'
import type { ElementStandardTagName } from '../tagName/type.js'

/** Many entries of {@link ElementStandardLibMap} resolve to plain `HTMLElement`
 * (e.g. `abbr`, `wbr`), which is structurally a supertype of every other
 * entry. Left unbranded, any union built from {@link ElementStandardLibMap}
 * collapses to `HTMLElement`, silently defeating voidness/custom-element
 * distinctions. The `_xDomTagName_` discriminant restores per-tag
 * distinctness, mirroring the `_xDomKind_` correction in domDiscriminants.d.ts. */
export type ElementStandardBranded<K extends ElementStandardTagName> =
  ElementStandardLibMap[K] & {
    readonly _xDomTagName_: 'disableDomDiscriminants' extends keyof XDomConfig
      ? string
      : K
  }
