import assert from 'node:assert/strict'
import { test } from 'node:test'

import { NodeParentChildValidator } from '../../../src/(node)/parent/child/validator/class.js'

class FakeParentBlueprint {}
class FakeChildBlueprintA {}
class FakeChildBlueprintB {}

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
