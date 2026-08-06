type BackingRegistryCarrier = Record<symbol, Set<string | symbol> | undefined>

/**
 * Adds a member key to `ctor`'s OWN backing-member registry, creating the
 * Set if absent. The own-property guard is load-bearing: registries hang off
 * constructors and statics inherit through the constructor chain, so a plain
 * `??=` would find an ancestor's Set and register into it — the ancestor
 * would then appear to have marked the member itself, hiding the real
 * declaring class from `enforceBacking`.
 *
 * Deliberately structured like `registerFinal` — same registry shape, same
 * own-property discipline — because it answers the same kind of question
 * ("which members did THIS class itself mark?"), just for a different
 * decorator family.
 */
export function registerBacking(
  ctor: object,
  registryKey: symbol,
  memberKey: string | symbol
): void {
  const carrier = ctor as BackingRegistryCarrier
  if (!Object.prototype.hasOwnProperty.call(carrier, registryKey)) {
    // eslint-disable-next-line security/detect-object-injection
    carrier[registryKey] = new Set<string | symbol>()
  }
  // eslint-disable-next-line security/detect-object-injection
  carrier[registryKey]?.add(memberKey)
}

/**
 * Reads `ctor`'s OWN registry under `registryKey`. Inherited registries are
 * deliberately invisible — `enforceBacking` only ever wants to know what the
 * class being decorated marked itself, then walks ancestors separately to
 * check for shadowing.
 */
export function ownBackingSet(
  ctor: object,
  registryKey: symbol
): Set<string | symbol> | undefined {
  if (!Object.prototype.hasOwnProperty.call(ctor, registryKey)) {
    return undefined
  }
  // eslint-disable-next-line security/detect-object-injection
  return (ctor as BackingRegistryCarrier)[registryKey]
}
