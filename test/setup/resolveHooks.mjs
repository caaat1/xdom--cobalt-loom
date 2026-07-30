// src/ is written for NodeNext resolution against its own *compiled* output
// (tsc emits dist/) — every local import uses a `.js` specifier even though
// only the `.ts` source exists on disk, which is exactly what tsc/NodeNext
// resolution expects. Node's own native TypeScript execution doesn't do that
// remapping — it resolves specifiers literally — so a `.js` import from a
// `.ts` source file fails to resolve at all when running directly under
// `node --test`, for any file with its own further local imports (i.e. most
// of src/).
//
// src/ itself stays untouched either way — this only affects how the test
// runner resolves modules.
export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context)
  } catch (error) {
    const isRelativeJs =
      specifier.endsWith('.js') &&
      (specifier.startsWith('./') || specifier.startsWith('../'))
    if (!isRelativeJs) {
      throw error
    }
    return nextResolve(`${specifier.slice(0, -'.js'.length)}.ts`, context)
  }
}
