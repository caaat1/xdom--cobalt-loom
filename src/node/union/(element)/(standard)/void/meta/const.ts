import type { ElementStandardMetaEntry } from '../../../standard/meta/entry/type.js'
import type { ElementStandardVoidTagName } from '../tagName/type.js'

export const elementStandardVoidMeta: Record<
  ElementStandardVoidTagName,
  ElementStandardMetaEntry
> = {
  area: { ariaRoles: ['link'], status: 'living-standard' },
  base: { ariaRoles: [], status: 'living-standard' },
  br: { ariaRoles: [], status: 'living-standard' },
  col: { ariaRoles: [], status: 'living-standard' },
  embed: { ariaRoles: [], status: 'living-standard' },
  hr: { ariaRoles: ['separator'], status: 'living-standard' },
  img: { ariaRoles: ['img'], status: 'living-standard' },
  input: { ariaRoles: ['textbox'], status: 'living-standard' },
  link: { ariaRoles: [], status: 'living-standard' },
  meta: { ariaRoles: [], status: 'living-standard' },
  param: { ariaRoles: [], status: 'deprecated' },
  source: { ariaRoles: [], status: 'living-standard' },
  track: { ariaRoles: [], status: 'living-standard' },
  wbr: { ariaRoles: [], status: 'living-standard' },
} as const
