import assert from 'node:assert/strict'
import { test } from 'node:test'

import { DocumentBlueprint } from '../../../src/(node)/(parent)/document/blueprint/class.js'

// DocumentBlueprint doesn't override childAccumulator or childValidator at
// all, and only supplies the registration chain for _childAllowed -- it's a
// real, minimal concrete instantiation of NodeParentBlueprint, so it's used
// directly here rather than fabricating a fake NodeParentBundle/
// NodeChildBundle pairing.

await test('childAccumulator is lazily cached: repeated access returns the same instance', () => {
  const blueprint = new DocumentBlueprint()
  assert.equal(blueprint.childAccumulator, blueprint.childAccumulator)
})

await test('childValidator is lazily cached: repeated access returns the same instance', () => {
  const blueprint = new DocumentBlueprint()
  assert.equal(blueprint.childValidator, blueprint.childValidator)
})

await test('childAllowed returns the same instance on repeated access', () => {
  const blueprint = new DocumentBlueprint()
  assert.equal(blueprint.childAllowed, blueprint.childAllowed)
})

await test('two instances of the same concrete blueprint class do not share a childAccumulator, childValidator, or childAllowed', () => {
  const a = new DocumentBlueprint()
  const b = new DocumentBlueprint()

  assert.notEqual(a.childAccumulator, b.childAccumulator)
  assert.notEqual(a.childValidator, b.childValidator)
  assert.notEqual(a.childAllowed, b.childAllowed)
})

// DocumentBlueprint builds _childAllowed by chaining
// .registerChildAllowed(...) directly off this.childValidator, and
// registerChildAllowed mutates its receiver's internal map and returns
// `this` rather than a new instance (see NodeParentChildValidator's own
// implementation) -- so childAllowed and childValidator end up being the
// exact same underlying object, not just equal-shaped ones.
await test('childAllowed is the same underlying object as childValidator, not a separate one', () => {
  const blueprint = new DocumentBlueprint()
  assert.equal(blueprint.childAllowed, blueprint.childValidator)
})
