import assert from 'node:assert/strict'
import { test } from 'node:test'

import { finalizeMethod } from '../../../src/tool/(decorator)/(member)/method/finalize/function.js'
import { finalizeProperty } from '../../../src/tool/(decorator)/(member)/property/finalize/function.js'
import { enforceFinal } from '../../../src/tool/class/(member)/final/enforce/function.js'

class Base {
  @finalizeProperty
  static readonly defaultLabel: string = 'base'
  @finalizeMethod
  static create(): Base {
    return new Base()
  }
  @finalizeMethod
  important(): string {
    return 'base important'
  }
  other(): string {
    return 'base other'
  }
}

await test('enforceFinal allows a subclass that does not shadow final members', () => {
  @enforceFinal
  class SubGood extends Base {}
  assert.equal(new SubGood().important(), 'base important')
  assert.ok(SubGood.create() instanceof Base)
})

await test('enforceFinal rejects a subclass overriding a final instance method', () => {
  assert.throws(() => {
    @enforceFinal
    class SubBad extends Base {
      override important(): string {
        return 'override'
      }
    }
    return SubBad
  }, /Cannot override final method 'important'/)
})

await test('enforceFinal rejects a subclass shadowing a final static member', () => {
  assert.throws(() => {
    @enforceFinal
    class SubBadStatic extends Base {
      static override create(): Base {
        return new SubBadStatic()
      }
    }
    return SubBadStatic
  }, /Cannot override final static member 'create'/)
})

await test('finalizeProperty freezes the declaring class static slot', () => {
  assert.throws(() => {
    // @ts-expect-error readonly — probing the runtime freeze on the static slot
    Base.defaultLabel = 'mutated'
  }, TypeError)
})
