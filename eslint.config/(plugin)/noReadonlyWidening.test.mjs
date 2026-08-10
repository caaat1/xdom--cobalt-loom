import { readFileSync } from 'node:fs'
import path from 'node:path'
import { after, describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

import tsParser from '@typescript-eslint/parser'
import { RuleTester } from '@typescript-eslint/rule-tester'

import { pluginNoReadonlyWidening } from './noReadonlyWidening.mjs'

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
  'no-readonly-widening',
  pluginNoReadonlyWidening.rules['no-readonly-widening'],
  {
    valid: [
      {
        name: 'readonly kept on overrides of both an abstract and a concrete ancestor readonly member; a member the ancestor never marked readonly needs no readonly; a member with no ancestor relation needs no readonly',
        code: readFixture('readonlyWidening/valid.ts'),
        filename: 'readonlyWidening/valid.ts',
      },
    ],
    invalid: [
      {
        name: 'dropping readonly on an override of an abstract-readonly ancestor member, and of a concrete-readonly ancestor member',
        code: readFixture('readonlyWidening/dropsReadonly.ts'),
        filename: 'readonlyWidening/dropsReadonly.ts',
        errors: [
          {
            messageId: 'readonlyDropped',
            data: { name: 'abstractReadonly', ancestor: 'Base' },
          },
          {
            messageId: 'readonlyDropped',
            data: { name: 'concreteReadonly', ancestor: 'Base' },
          },
        ],
      },
    ],
  }
)
