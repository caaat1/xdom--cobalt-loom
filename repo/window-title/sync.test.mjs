// @ts-check
import assert from 'node:assert/strict'
import { test } from 'node:test'

import { renderContent } from './sync.mjs'

await test('renderContent embeds the folder name in a <window-title> element', () => {
  assert.equal(
    renderContent('child'),
    '<!-- markdownlint-disable-file MD041 -->\n\n<window-title>child</window-title>\n'
  )
})

await test('renderContent disables markdownlint MD041 (no leading h1)', () => {
  assert.match(
    renderContent('parent'),
    /^<!-- markdownlint-disable-file MD041 -->/
  )
})
