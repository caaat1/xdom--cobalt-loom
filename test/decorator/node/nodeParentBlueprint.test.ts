import assert from 'node:assert/strict'
import { test } from 'node:test'

import { DocumentBlueprint } from '../../../src/(node)/(parent)/document/blueprint/class.js'

// DocumentBlueprint doesn't override nodeParentChildAccumulator or
// nodeParentChildValidator at all, and only supplies the registration chain
// for _nodeParentChildAllowed -- it's a real, minimal concrete instantiation
// of NodeParentBlueprint, so it's used directly here rather than fabricating
// a fake NodeParentBundle/NodeChildBundle pairing.

await test('nodeParentChildAccumulator is lazily cached: repeated access returns the same instance', () => {
  const blueprint = new DocumentBlueprint()
  assert.equal(
    blueprint.nodeParentChildAccumulator,
    blueprint.nodeParentChildAccumulator
  )
})

await test('nodeParentChildValidator is lazily cached: repeated access returns the same instance', () => {
  const blueprint = new DocumentBlueprint()
  assert.equal(
    blueprint.nodeParentChildValidator,
    blueprint.nodeParentChildValidator
  )
})

await test('nodeParentChildAllowed returns the same instance on repeated access', () => {
  const blueprint = new DocumentBlueprint()
  assert.equal(
    blueprint.nodeParentChildAllowed,
    blueprint.nodeParentChildAllowed
  )
})

await test('two instances of the same concrete blueprint class do not share a nodeParentChildAccumulator, nodeParentChildValidator, or nodeParentChildAllowed', () => {
  const a = new DocumentBlueprint()
  const b = new DocumentBlueprint()

  assert.notEqual(a.nodeParentChildAccumulator, b.nodeParentChildAccumulator)
  assert.notEqual(a.nodeParentChildValidator, b.nodeParentChildValidator)
  assert.notEqual(a.nodeParentChildAllowed, b.nodeParentChildAllowed)
})

// DocumentBlueprint builds _nodeParentChildAllowed by chaining
// .registerChildAllowed(...) directly off this.nodeParentChildValidator, and
// registerChildAllowed mutates its receiver's internal map and returns
// `this` rather than a new instance (see NodeParentChildValidator's own
// implementation) -- so nodeParentChildAllowed and nodeParentChildValidator
// end up being the exact same underlying object, not just equal-shaped ones.
await test('nodeParentChildAllowed is the same underlying object as nodeParentChildValidator, not a separate one', () => {
  const blueprint = new DocumentBlueprint()
  assert.equal(
    blueprint.nodeParentChildAllowed,
    blueprint.nodeParentChildValidator
  )
})
