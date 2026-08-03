import type { ElementStandardMetaEntry } from '../../../standard/meta/entry/type.js'
import type { ElementStandardVoidTagName } from '../tagName/type.js'

export const elementStandardVoidMeta: Record<
  ElementStandardVoidTagName,
  ElementStandardMetaEntry
> = {
  area: { ariaRoles: ['link'], status: 'livingStandard' },
  base: { ariaRoles: [], status: 'livingStandard' },
  br: { ariaRoles: [], status: 'livingStandard' },
  col: { ariaRoles: [], status: 'livingStandard' },
  embed: { ariaRoles: [], status: 'livingStandard' },
  hr: { ariaRoles: ['separator'], status: 'livingStandard' },
  img: { ariaRoles: ['img'], status: 'livingStandard' },
  input: { ariaRoles: ['textbox'], status: 'livingStandard' },
  link: { ariaRoles: [], status: 'livingStandard' },
  meta: { ariaRoles: [], status: 'livingStandard' },
  param: { ariaRoles: [], status: 'deprecated' },
  source: { ariaRoles: [], status: 'livingStandard' },
  track: { ariaRoles: [], status: 'livingStandard' },
  wbr: { ariaRoles: [], status: 'livingStandard' },
} as const
