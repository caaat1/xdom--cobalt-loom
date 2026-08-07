// @ts-check
import assert from 'node:assert/strict'
import { test } from 'node:test'

import { normalize } from './sync.mjs'

await test('normalize passes a plain https URL through as owner/repo', () => {
  assert.equal(
    normalize('https://github.com/caaat1/cobalt-loom'),
    'caaat1/cobalt-loom'
  )
})

await test('normalize strips the git+ prefix some registries record', () => {
  assert.equal(
    normalize('git+https://github.com/caaat1/cobalt-loom'),
    'caaat1/cobalt-loom'
  )
})

await test('normalize strips a trailing .git suffix', () => {
  assert.equal(
    normalize('https://github.com/caaat1/cobalt-loom.git'),
    'caaat1/cobalt-loom'
  )
})

await test('normalize strips trailing slashes', () => {
  assert.equal(
    normalize('https://github.com/caaat1/cobalt-loom/'),
    'caaat1/cobalt-loom'
  )
})

await test('normalize rewrites the scp-like ssh form (git@github.com:owner/repo.git)', () => {
  assert.equal(
    normalize('git@github.com:caaat1/cobalt-loom.git'),
    'caaat1/cobalt-loom'
  )
})

await test('normalize rewrites the ssh:// URL form', () => {
  assert.equal(
    normalize('ssh://git@github.com/caaat1/cobalt-loom.git'),
    'caaat1/cobalt-loom'
  )
})

await test('normalize lowercases the result, since GitHub owner/repo is case-insensitive', () => {
  assert.equal(
    normalize('https://github.com/Caaat1/Cobalt-Loom'),
    'caaat1/cobalt-loom'
  )
})

await test('normalize trims surrounding whitespace', () => {
  assert.equal(
    normalize('  https://github.com/caaat1/cobalt-loom  '),
    'caaat1/cobalt-loom'
  )
})
