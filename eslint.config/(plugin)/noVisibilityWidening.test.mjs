import { readFileSync } from 'node:fs'
import path from 'node:path'
import { after, describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

import tsParser from '@typescript-eslint/parser'
import { RuleTester } from '@typescript-eslint/rule-tester'

import { pluginNoVisibilityWidening } from './noVisibilityWidening.mjs'

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

ruleTester.run(
  'no-visibility-widening',
  pluginNoVisibilityWidening.rules['no-visibility-widening'],
  {
    valid: [
      {
        name: 'visibility kept the same as the ancestor on override; a member with no ancestor relation needs no match',
        code: readFixture('noVisibilityWidening/valid.ts'),
        filename: 'noVisibilityWidening/valid.ts',
      },
    ],
    invalid: [
      {
        name: 'widening a protected ancestor member to public on override',
        code: readFixture('noVisibilityWidening/widensVisibility.ts'),
        filename: 'noVisibilityWidening/widensVisibility.ts',
        errors: [
          {
            messageId: 'visibilityWidened',
            data: {
              name: 'protectedMember',
              base: 'protected',
              child: 'public',
            },
          },
        ],
      },
    ],
  }
)
