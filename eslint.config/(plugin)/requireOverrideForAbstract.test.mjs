import { readFileSync } from 'node:fs'
import path from 'node:path'
import { after, describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

import tsParser from '@typescript-eslint/parser'
import { RuleTester } from '@typescript-eslint/rule-tester'

import { pluginRequireOverrideForAbstract } from './requireOverrideForAbstract.mjs'

// @typescript-eslint/rule-tester is framework-agnostic by design — wire it to
// node:test's own describe/it/after rather than relying on mocha-style
// globals, matching how the rest of this repo runs its suites.
RuleTester.afterAll = after
RuleTester.describe = describe
RuleTester.it = it

const dirname = path.dirname(fileURLToPath(import.meta.url))
const fixturesDir = path.join(dirname, 'fixtures')

// Each case's `code` is read straight off the real fixture file rather than
// duplicated inline: type-aware parsing needs `filename` to resolve to a
// real file included by fixtures/tsconfig.json anyway, so reading it keeps
// that one file the single source of truth instead of two copies drifting
// apart.
function readFixture(relativePath) {
  return readFileSync(path.join(fixturesDir, relativePath), 'utf8')
}

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: './tsconfig.json',
      sourceType: 'module',
      tsconfigRootDir: fixturesDir,
    },
  },
})

const missingOverrideMessage =
  'Implementing an abstract member; add the `override` modifier to make intent explicit.'

ruleTester.run(
  'require-override-for-abstract',
  pluginRequireOverrideForAbstract.rules['require-override-for-abstract'],
  {
    valid: [
      {
        name: 'override kept on an implemented abstract method and property; a fresh member with no ancestor relation needs no override',
        code: readFixture('requireOverrideForAbstract/valid.ts'),
        filename: 'requireOverrideForAbstract/valid.ts',
      },
    ],
    invalid: [
      {
        name: 'missing override on an implemented abstract method, and on an implemented abstract property',
        code: readFixture('requireOverrideForAbstract/missingOverride.ts'),
        filename: 'requireOverrideForAbstract/missingOverride.ts',
        errors: [
          { message: missingOverrideMessage },
          { message: missingOverrideMessage },
        ],
      },
    ],
  }
)
