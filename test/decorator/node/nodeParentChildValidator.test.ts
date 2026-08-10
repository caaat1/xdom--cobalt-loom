import assert from 'node:assert/strict'
import { test } from 'node:test'

import { NodeParentChildValidator } from '../../../src/(node)/parent/child/validator/class.js'

class FakeParentBlueprint {}
class FakeChildBlueprintA {}
class FakeChildBlueprintB {}
class FakeChildBlueprintASub extends FakeChildBlueprintA {}

await test('validate defaults to true for a child ctor with no registered validator', () => {
  const validator = new NodeParentChildValidator<FakeParentBlueprint>()
  const result = validator.validate({
    nodeParentBlueprint: new FakeParentBlueprint(),
    nodeChildBlueprint: new FakeChildBlueprintA(),
  })
  assert.equal(result, true)
})

await test('validate invokes the callback registered for the matching child ctor, forwarding both blueprints', () => {
  const validator = new NodeParentChildValidator<FakeParentBlueprint>()
  let received: unknown
  validator.registerChildAllowed(FakeChildBlueprintA, (param) => {
    received = param
    return false
  })
  const nodeParentBlueprint = new FakeParentBlueprint()
  const nodeChildBlueprint = new FakeChildBlueprintA()

  const result = validator.validate({ nodeParentBlueprint, nodeChildBlueprint })

  assert.equal(result, false)
  assert.deepEqual(received, { nodeParentBlueprint, nodeChildBlueprint })
})

await test('validate ignores a validator registered for a different child ctor', () => {
  const validator = new NodeParentChildValidator<FakeParentBlueprint>()
  validator.registerChildAllowed(FakeChildBlueprintA, () => false)

  const result = validator.validate({
    nodeParentBlueprint: new FakeParentBlueprint(),
    nodeChildBlueprint: new FakeChildBlueprintB(),
  })

  assert.equal(result, true)
})

await test('registerChildAllowed returns the same instance for chaining', () => {
  const validator = new NodeParentChildValidator<FakeParentBlueprint>()
  const returned = validator.registerChildAllowed(
    FakeChildBlueprintA,
    undefined
  )
  assert.equal(returned, validator)
})

await test('validate defaults to true for a child ctor registered with undefined, same as an unregistered one', () => {
  const validator = new NodeParentChildValidator<FakeParentBlueprint>()
  validator.registerChildAllowed(FakeChildBlueprintA, undefined)

  const result = validator.validate({
    nodeParentBlueprint: new FakeParentBlueprint(),
    nodeChildBlueprint: new FakeChildBlueprintA(),
  })

  assert.equal(result, true)
})

await test('validate matches by exact constructor, not instanceof: a cb registered for a base ctor does not fire for a subclass instance', () => {
  const validator = new NodeParentChildValidator<FakeParentBlueprint>()
  validator.registerChildAllowed(FakeChildBlueprintA, () => false)

  const result = validator.validate({
    nodeParentBlueprint: new FakeParentBlueprint(),
    nodeChildBlueprint: new FakeChildBlueprintASub(),
  })

  assert.equal(result, true)
})

await test('registerChildAllowed called twice for the same ctor overwrites the earlier cb', () => {
  const validator = new NodeParentChildValidator<FakeParentBlueprint>()
  validator.registerChildAllowed(FakeChildBlueprintA, () => false)
  validator.registerChildAllowed(FakeChildBlueprintA, () => true)

  const result = validator.validate({
    nodeParentBlueprint: new FakeParentBlueprint(),
    nodeChildBlueprint: new FakeChildBlueprintA(),
  })

  assert.equal(result, true)
})

await test('_lf is a no-op that returns the same instance', () => {
  const validator = new NodeParentChildValidator<FakeParentBlueprint>()
  assert.equal(validator._lf(), validator)
})
