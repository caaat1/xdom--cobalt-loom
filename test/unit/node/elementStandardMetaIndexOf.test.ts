import assert from 'node:assert/strict'
import { test } from 'node:test'

import { getElementStandardMetaIndexOf } from '../../../src/(node)/(element)/standard/meta/indexOf/get/function.js'

// Anchors computed by actually running Object.keys() ∪ sort() against the
// two real source meta tables (141 entries total) rather than hand-counted
// from the source text — a first pass regex-scraping the two const.ts files
// directly undercounted by missing multi-line entries (values wrapped onto
// their own line), which is exactly the kind of mismatch this double-check
// exists to catch.
await test('getElementStandardMetaIndexOf returns 1 for the alphabetically first tag', () => {
  assert.equal(getElementStandardMetaIndexOf('a'), 1)
})

await test('getElementStandardMetaIndexOf returns the total count for the alphabetically last tag', () => {
  assert.equal(getElementStandardMetaIndexOf('xmp'), 141)
})

await test('getElementStandardMetaIndexOf finds a tag from the non-void set', () => {
  assert.equal(getElementStandardMetaIndexOf('div'), 37)
})

await test('getElementStandardMetaIndexOf finds a tag from the void set merged into the same sorted order', () => {
  assert.equal(getElementStandardMetaIndexOf('img'), 63)
})
