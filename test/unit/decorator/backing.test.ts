import assert from 'node:assert/strict'
import { test } from 'node:test'

import { backMethod } from '../../../src/tool/(decorator)/(member)/method/back/function.js'
import { backProperty } from '../../../src/tool/(decorator)/(member)/property/back/function.js'
import { enforceBacking } from '../../../src/tool/class/(member)/backing/enforce/function.js'

class Base {
  concreteMethod(): string {
    return 'base concrete'
  }
  static concreteStatic(): string {
    return 'base concrete static'
  }
}

await test('enforceBacking allows @back-marked members that do not shadow an ancestor', () => {
  @enforceBacking
  class Sub extends Base {
    @backMethod
    freshMethod(): string {
      return 'fresh'
    }
    @backMethod
    static freshStatic(): string {
      return 'fresh static'
    }
  }
  assert.equal(new Sub().freshMethod(), 'fresh')
  assert.equal(Sub.freshStatic(), 'fresh static')
})

await test('enforceBacking rejects @backMethod on an instance method that shadows a concrete ancestor method', () => {
  assert.throws(() => {
    @enforceBacking
    class Sub extends Base {
      @backMethod
      override concreteMethod(): string {
        return 'shadowed'
      }
    }
    return Sub
  }, /already exists on Base/)
})

await test('enforceBacking rejects @backMethod on a static member that shadows a concrete ancestor static', () => {
  assert.throws(() => {
    @enforceBacking
    class Sub extends Base {
      @backMethod
      static override concreteStatic(): string {
        return 'shadowed'
      }
    }
    return Sub
  }, /already exists on Base/)
})

await test('backProperty on an instance field is an unchecked intent marker', () => {
  assert.doesNotThrow(() => {
    @enforceBacking
    class Sub extends Base {
      @backProperty
      extra = 'unchecked'
    }
    return Sub
  })
})

await test('enforceBacking rejects @backProperty on a static field that shadows a concrete ancestor static field', () => {
  class BaseWithTag {
    static readonly tag: string = 'base tag'
  }
  assert.throws(() => {
    @enforceBacking
    class Sub extends BaseWithTag {
      @backProperty
      static override readonly tag: string = 'shadowed tag'
    }
    return Sub
  }, /already exists on BaseWithTag/)
})
