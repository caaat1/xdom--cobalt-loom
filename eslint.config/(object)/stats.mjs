// @ts-check
import { resolve } from 'node:path'

import tsParser from '@typescript-eslint/parser'
import globals from 'globals'

import { findProjectRootDir } from './base/findProjectRootDir.mjs'
import { baseRules, basePlugins } from './base.mjs'

const rootDir = findProjectRootDir(import.meta.dirname)
// stats/ owns its own tsconfig.json boundary (see that file's own header) —
// covers every stats/<tool>/ folder, current and future, in one program.
const statsTsconfigPath = resolve(rootDir, 'stats/tsconfig.json')

/** @type {import('eslint').Linter.Config} */
export const eslintConfigStats = {
  files: ['stats/**/*.{ts,mts,cts}'],
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.es2022,
    },
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 'latest',
      project: statsTsconfigPath,
      sourceType: 'module',
    },
  },
  plugins: basePlugins,
  rules: {
    ...baseRules,
    // src/'s no-console ban exists because a browser DOM library should
    // never write to the console as a side effect of being used — the exact
    // opposite of what this tree is for: script.ts's whole job is reporting
    // collected stats to the terminal.
    'no-console': 'off',
    // Every fs call under stats/ operates on paths built from this tool's
    // own BASE_DIR/DATA_DIR and the timestamped filenames it generates
    // itself, never on attacker-influenced input — same reasoning
    // test.mjs's own identical override already documents for test/.
    'security/detect-non-literal-fs-filename': 'off',
  },
  settings: {
    'import-x/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: statsTsconfigPath,
      },
    },
  },
}

// Narrower and declared after eslintConfigStats, so flat config's own
// last-one-wins layering applies this on top of it for *.test.ts only —
// script.ts/config.ts themselves stay under the strict src-like default
// above. Same relaxation test.mjs's own eslintConfigTest already applies to
// every test/**/*.ts file, for the identical reason: TS already infers the
// return type of a one-line node:test callback correctly, and there's no
// real API boundary for the annotation to document.
/** @type {import('eslint').Linter.Config} */
export const eslintConfigStatsTests = {
  files: ['stats/**/*.test.{ts,mts,cts}'],
  rules: {
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
}
