import assert from 'node:assert/strict'
import { test } from 'node:test'

import { expandIncludeEntry } from '../config.js'

await test('expandIncludeEntry expands a bare directory name to a recursive glob', () => {
  assert.equal(expandIncludeEntry('src'), 'src/**/*')
})

await test('expandIncludeEntry leaves an entry containing glob metacharacters untouched', () => {
  for (const pattern of [
    'src/**/*.ts',
    'src/*.ts',
    'src/file?.ts',
    'src/[a-z].ts',
    'src/{a,b}.ts',
  ]) {
    assert.equal(expandIncludeEntry(pattern), pattern)
  }
})
