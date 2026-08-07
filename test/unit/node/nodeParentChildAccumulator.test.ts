import assert from 'node:assert/strict'
import { test } from 'node:test'

import { NodeParentChildAccumulator } from '../../../src/(node)/parent/child/accumulator/class.js'
import { UserInputHandlerError } from '../../../src/tool/user/input/handler/error.js'

// No concrete NodeParentBundle exists in src/ yet (Document/DocumentBlueprint
// is still fully commented out) to plug in as real generic arguments —
// `never` satisfies the recursive bound trivially and is erased at runtime
// either way, so it doesn't weaken what canSetSafely's own logic (the only
// thing this class adds over its UserInputHandler base) actually gets
// exercised with.
function makeAccumulator(): NodeParentChildAccumulator<never, never> {
  return new NodeParentChildAccumulator<never, never>({
    owner: undefined as never,
  })
}

await test('accepts any value that is not null or undefined', () => {
  const acc = makeAccumulator()
  assert.doesNotThrow(() => acc.set({ some: 'molecule' }))
})

await test('rejects undefined', () => {
  const acc = makeAccumulator()
  assert.throws(() => acc.set(), UserInputHandlerError)
})

await test('rejects null', () => {
  const acc = makeAccumulator()
  assert.throws(() => acc.set(null as never), UserInputHandlerError)
})
