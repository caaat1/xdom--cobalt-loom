// @ts-check
import { resolve } from 'node:path'

import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import-x'
import globals from 'globals'

import { findProjectRootDir } from './base/findProjectRootDir.mjs'
import { baseRules, basePlugins } from './base.mjs'
import { deriveForPluginImportX } from './forPluginImportX/derive.mjs'

const rootDir = findProjectRootDir(import.meta.dirname)
const tsconfigPath = resolve(rootDir, 'tsconfig.json')
// test/ is deliberately not in the root tsconfig's own `include` (see that
// file's own comment) — it has its own, so it can still be type-checked
// without ever being part of a real `npm run build` emit.
const testTsconfigPath = resolve(rootDir, 'test/tsconfig.json')

/** @type {import('eslint').Linter.Config} */
export const eslintConfigTest = {
  files: ['test/**/*.{ts,mts,cts}'],
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.es2022,
    },
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 'latest',
      project: testTsconfigPath,
      sourceType: 'module',
    },
  },
  plugins: basePlugins,
  rules: {
    ...baseRules,
    // No import/extensions override here — test/'s own imports of src/ use
    // the same `.js` NodeNext specifiers src/ uses internally. tsc's own
    // NodeNext resolution already maps them to the sibling `.ts` source at
    // type-check time (same mechanism that already makes src/'s internal
    // `.js` imports type-check), and test/setup/resolveHooks.mjs's retry
    // does the equivalent at `node --test` runtime. Literal `.ts`
    // specifiers would need `allowImportingTsExtensions`, which requires
    // `noEmit`/`emitDeclarationOnly` — incompatible with this profile's
    // tsc, which really emits (`npm run build`), unlike vsc-extension's
    // tsc-as-typechecker-only setup where that combination is free. (A
    // project that also drives a second runner needing literal `.ts`
    // specifiers, e.g. Playwright, would need to reconsider this — see
    // vsc-extension's own test/browser/ for that shape.)

    // Kebab-case/camelCase mixing across test/ (helpers/, fakes/, .test.ts
    // files) isn't worth policing the way src/'s own naming is.
    'unicorn/filename-case': 'off',
    // Every fs call test/ makes typically operates on locally-generated
    // temp paths, never attacker-influenced input — nothing for this rule
    // to usefully catch there. If a project's tests never touch fs at all,
    // this override is simply inert.
    'security/detect-non-literal-fs-filename': 'off',
    // src/'s no-magic-numbers config exists to catch unexplained tunable/
    // business-logic constants buried in production code — a real hazard
    // there. Inside a test, a literal like `assert.equal(sum(2, 3), 5)` IS
    // the test's data, not a hidden constant; forcing it behind a named
    // const or swapping it for an arbitrary string just to satisfy the rule
    // adds indirection without the payoff the rule exists for.
    '@typescript-eslint/no-magic-numbers': 'off',
    // src/'s own explicit-function-return-type config (allowExpressions:
    // false, allowTypedFunctionExpressions: false) means even a trivial
    // inline predicate needs its own annotation — appropriate for src/'s
    // exported functions/module boundaries, but overwhelming noise across
    // test/'s many one-line test()/t.test() callbacks, where TS already
    // infers the return type correctly and there's no real API boundary
    // for the annotation to document.
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: false,
        allowDirectConstAssertionInArrowFunctions: false,
        allowConciseArrowFunctionExpressionsStartingWithVoid: false,
      },
    ],
  },
  settings: {
    'import-x/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: testTsconfigPath,
      },
    },
  },
}

// test/setup/*.mjs — plain Node ESM hook scripts, not part of tsconfig's own
// `include` (it doesn't set allowJs), so they can't join eslintConfigTest's
// type-aware program the way the `.ts` test files above do. Mirrors
// self.mjs's own non-type-aware half rather than reaching for
// project:false/projectService:true — two small files, not worth the extra
// machinery.
const forPluginImportX = deriveForPluginImportX(tsconfigPath)

/** @type {import('eslint').Linter.Config} */
export const eslintConfigTestScripts = {
  files: ['test/**/*.mjs'],
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.es2022,
    },
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  plugins: /** @type {import('eslint').Linter.Config['plugins']} */ (
    /** @type {unknown} */ ({
      import: importPlugin,
    })
  ),
  rules: {
    ...js.configs.recommended.rules,
    curly: ['error', 'all'],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    ...forPluginImportX.rules,
  },
  settings: forPluginImportX.settings,
}
