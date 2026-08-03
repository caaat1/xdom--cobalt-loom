import type { ElementStandardStatusDeprecated } from '../(status)/deprecated/type.js'
import type { ElementStandardStatusExperimental } from '../(status)/experimental/type.js'
import type { ElementStandardStatusLivingStandard } from '../(status)/livingStandard/type.js'

export type ElementStandardStatus =
  | ElementStandardStatusDeprecated
  | ElementStandardStatusExperimental
  | ElementStandardStatusLivingStandard
