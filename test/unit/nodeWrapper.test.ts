import assert from 'node:assert/strict'
import { test } from 'node:test'

import { JSDOM } from 'jsdom'

import { T_NodeWrapper } from '../../src/index.js'

await test('T_NodeWrapper exposes nodeName and textContent from a wrapped DOM node', () => {
  const dom = new JSDOM('<!doctype html><body><p>hello</p></body>')
  const paragraph = dom.window.document.querySelector('p')
  assert.ok(paragraph !== null)

  const wrapper = new T_NodeWrapper(paragraph)

  assert.equal(wrapper.nodeName, 'P')
  assert.equal(wrapper.textContent, 'hello')
})
