import assert from 'node:assert/strict'
import { test } from 'node:test'

import { UserInputHandlerIntermediate } from '../../../src/tool/user/input/(handler)/intermediate/class.js'
import { UserInputHandler } from '../../../src/tool/user/input/handler/class.js'
import { UserInputHandlerError } from '../../../src/tool/user/input/handler/error.js'

class StringHandler extends UserInputHandler<string> {
  protected override canSetSafely(value: unknown): value is string {
    return typeof value === 'string'
  }
  get value(): string | undefined {
    return this.input
  }
}

class NumberHandler extends UserInputHandler<number> {
  protected override canSetSafely(value: unknown): value is number {
    return typeof value === 'number'
  }
  get value(): number | undefined {
    return this.input
  }
}

class NameHandler extends UserInputHandlerIntermediate<{
  first: StringHandler
  last: StringHandler
}> {
  readonly first = new StringHandler({ owner: undefined })
  readonly last = new StringHandler({ owner: undefined })
  protected override child = { first: this.first, last: this.last }
}

class FormHandler extends UserInputHandlerIntermediate<{
  name: NameHandler
  age: NumberHandler
}> {
  readonly name = new NameHandler({ owner: undefined })
  readonly age = new NumberHandler({ owner: undefined })
  protected override child = { name: this.name, age: this.age }
}

await test('a leaf handler accepts a value matching its own type guard', () => {
  const handler = new StringHandler({ owner: undefined })
  handler.set('hello')
  assert.equal(handler.value, 'hello')
})

await test('a leaf handler throws UserInputHandlerError when its type guard rejects the value', () => {
  const notAString = 123
  const handler = new StringHandler({ owner: undefined })
  assert.throws(
    () => handler.set(notAString as unknown as string),
    UserInputHandlerError
  )
})

await test('a subclass can override onRejected with a custom message', () => {
  class LoudHandler extends UserInputHandler<string> {
    protected override canSetSafely(value: unknown): value is string {
      return typeof value === 'string'
    }
    protected override onRejected = (param: {
      input: unknown
      owner: object | undefined
      message?: string
    }): void => {
      throw new UserInputHandlerError({ ...param, message: 'custom!' })
    }
  }
  const handler = new LoudHandler({ owner: undefined })
  assert.throws(() => handler.set(1 as unknown as string), /custom!/)
})

await test('a container handler routes nested raw values down to leaf handlers', () => {
  const age = 36
  const form = new FormHandler({ owner: undefined })
  form.set({ name: { first: 'Ada', last: 'Lovelace' }, age })
  assert.equal(form.name.first.value, 'Ada')
  assert.equal(form.name.last.value, 'Lovelace')
  assert.equal(form.age.value, age)
})

await test('a container handler only routes the keys present in a partial update', () => {
  const updatedAge = 40
  const form = new FormHandler({ owner: undefined })
  form.set({ age: updatedAge })
  assert.equal(form.age.value, updatedAge)
  assert.equal(form.name.first.value, undefined)
})

await test('a container handler rethrows a leaf handler rejection', () => {
  const form = new FormHandler({ owner: undefined })
  assert.throws(
    () => form.set({ age: 'not a number' as unknown as number }),
    UserInputHandlerError
  )
})

await test('a container handler rejects a non-traversable top-level value', () => {
  const form = new FormHandler({ owner: undefined })
  assert.throws(
    () => form.set('nope' as unknown as never),
    UserInputHandlerError
  )
})

await test('a container handler rejects a key with no matching child instead of silently dropping it', () => {
  const form = new FormHandler({ owner: undefined })
  assert.throws(
    () => form.set({ bogus: 'whatever' } as never),
    UserInputHandlerError
  )
  assert.equal(form.age.value, undefined)
})

await test('a container handler rejects a __proto__-keyed value instead of routing it', () => {
  const form = new FormHandler({ owner: undefined })
  assert.throws(
    () => form.set(JSON.parse('{"__proto__": {"polluted": true}}') as never),
    UserInputHandlerError
  )
  assert.equal((Object.prototype as { polluted?: boolean }).polluted, undefined)
})
