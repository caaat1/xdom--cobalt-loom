type FinalRegistryCarrier = Record<symbol, Set<string | symbol> | undefined>

/**
 * Adds a member key to `ctor`'s OWN final-member registry, creating the Set
 * if absent. The own-property guard is load-bearing: registries hang off
 * constructors and statics inherit through the constructor chain, so a plain
 * `??=` would find an ancestor's Set and register into it — the ancestor
 * would then appear to have declared the member final, failing every sibling
 * subclass in `enforceFinal`.
 */
export function registerFinal(
  ctor: object,
  registryKey: symbol,
  memberKey: string | symbol
): void {
  const carrier = ctor as FinalRegistryCarrier
  if (!Object.prototype.hasOwnProperty.call(carrier, registryKey)) {
    // eslint-disable-next-line security/detect-object-injection
    carrier[registryKey] = new Set<string | symbol>()
  }
  // eslint-disable-next-line security/detect-object-injection
  carrier[registryKey]?.add(memberKey)
}

/**
 * Reads `ctor`'s OWN registry under `registryKey`. Inherited registries are
 * deliberately invisible — chain walks visit each ancestor and read its own
 * entries at that level, keeping error attribution correct.
 */
export function ownFinalSet(
  ctor: object,
  registryKey: symbol
): Set<string | symbol> | undefined {
  if (!Object.prototype.hasOwnProperty.call(ctor, registryKey)) {
    return undefined
  }
  // eslint-disable-next-line security/detect-object-injection
  return (ctor as FinalRegistryCarrier)[registryKey]
}
