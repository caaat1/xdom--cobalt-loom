import assert from 'node:assert/strict'
import { test } from 'node:test'

import { implementMethod } from '../../../src/tool/(decorator)/(member)/method/implement/function.js'
import { implementProperty } from '../../../src/tool/(decorator)/(member)/property/implement/function.js'
import { enforceImplementing } from '../../../src/tool/class/(member)/implementing/enforce/function.js'

const CONTRACT = 'Labeled'
const CONTRACT_KEYS = ['label', 'describe'] as const

await test('enforceImplementing accepts a class covering every required key', () => {
  @enforceImplementing(CONTRACT, CONTRACT_KEYS)
  class Widget {
    @implementProperty(CONTRACT)
    label = 'widget'
    @implementMethod(CONTRACT)
    describe(): string {
      return 'a widget'
    }
  }
  const widget = new Widget()
  assert.equal(widget.label, 'widget')
  assert.equal(widget.describe(), 'a widget')
})

await test('enforceImplementing rejects a class missing a required member', () => {
  assert.throws(() => {
    @enforceImplementing(CONTRACT, CONTRACT_KEYS)
    class Widget {
      @implementProperty(CONTRACT)
      label = 'widget'
    }
    return Widget
  }, /missing implementation of 'Labeled' member\(s\): describe/)
})

await test('enforceImplementing rejects a marker for a member outside the contract', () => {
  assert.throws(() => {
    @enforceImplementing(CONTRACT, CONTRACT_KEYS)
    class Widget {
      @implementProperty(CONTRACT)
      label = 'widget'
      @implementMethod(CONTRACT)
      describe(): string {
        return 'a widget'
      }
      @implementMethod(CONTRACT)
      extra(): string {
        return 'extra'
      }
    }
    return Widget
  }, /that are not part of it: extra/)
})

await test('enforceImplementing counts coverage inherited from an ancestor class', () => {
  class Base {
    @implementProperty(CONTRACT)
    label = 'base widget'
  }
  @enforceImplementing(CONTRACT, CONTRACT_KEYS)
  class Sub extends Base {
    @implementMethod(CONTRACT)
    describe(): string {
      return 'a sub widget'
    }
  }
  assert.equal(new Sub().describe(), 'a sub widget')
})

await test('a typo in the contract name is caught as a missing implementation', () => {
  assert.throws(() => {
    @enforceImplementing(CONTRACT, CONTRACT_KEYS)
    class Widget {
      @implementProperty('Labelled')
      label = 'widget'
      @implementMethod(CONTRACT)
      describe(): string {
        return 'a widget'
      }
    }
    return Widget
  }, /missing implementation of 'Labeled' member\(s\): label/)
})
