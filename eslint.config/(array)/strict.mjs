import { eslintConfigBase } from '../(object)/base.mjs'
import { eslintConfigIgnores } from '../(object)/ignores.mjs'
import {
  eslintConfigSelf,
  eslintConfigSelfTypeAware,
} from '../(object)/self.mjs'
import { eslintConfigTest, eslintConfigTestScripts } from '../(object)/test.mjs'

export const eslintConfigStrict = [
  // Must stay first and ignores-only — see ignores.mjs's own header for why.
  eslintConfigIgnores,
  // Lints eslint.config.mjs and the eslint.config/ tree itself — see
  // self.mjs's own header for why it's split into two config objects.
  eslintConfigSelf,
  eslintConfigSelfTypeAware,
  eslintConfigBase,
  // test/ — always wired, not conditional (see test.mjs's own header).
  eslintConfigTest,
  eslintConfigTestScripts,
]
