import { readFileSync } from 'node:fs'
import path from 'node:path'
import { after, describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

import tsParser from '@typescript-eslint/parser'
import { RuleTester } from '@typescript-eslint/rule-tester'

import { pluginRequireBackingMatchesAbstract } from './requireBackingMatchesAbstract.mjs'

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
// real file included by fixtures/tsconfig.json anyway (so imports between
// fixtures resolve), and reading it keeps that one file the single source
// of truth instead of two copies drifting apart.
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
  'require-backing-matches-abstract',
  pluginRequireBackingMatchesAbstract.rules['require-backing-matches-abstract'],
  {
    valid: [
      {
        name: '@backMethod backs a genuinely abstract instance member; the static member has no ancestor relation at all, which is fine — statics are shadow-checked only',
        code: readFixture('backing/valid.ts'),
        filename: 'backing/valid.ts',
      },
    ],
    invalid: [
      {
        name: '@backMethod on a member that already exists concretely on the ancestor (instance and static)',
        code: readFixture('backing/shadowsAncestor.ts'),
        filename: 'backing/shadowsAncestor.ts',
        errors: [
          {
            messageId: 'shadowsConcreteAncestor',
            data: {
              name: 'concreteMethod',
              decorator: 'backMethod',
              ancestor: 'Base',
            },
          },
          {
            messageId: 'shadowsConcreteAncestor',
            data: {
              name: 'concreteStatic',
              decorator: 'backMethod',
              ancestor: 'Base',
            },
          },
        ],
      },
      {
        name: '@backProperty with no abstract ancestor member by that name — instance only, statics have no such check',
        code: readFixture('backing/noAbstractAncestor.ts'),
        filename: 'backing/noAbstractAncestor.ts',
        errors: [
          {
            messageId: 'noAbstractAncestor',
            data: { name: 'extra', decorator: 'backProperty' },
          },
        ],
      },
      {
        name: '@backMethod on a class with no ancestor at all — instance is flagged, the static sibling is not',
        code: readFixture('backing/noAncestorClass.ts'),
        filename: 'backing/noAncestorClass.ts',
        errors: [
          {
            messageId: 'noAbstractAncestor',
            data: { name: 'freshMethod', decorator: 'backMethod' },
          },
        ],
      },
    ],
  }
)
