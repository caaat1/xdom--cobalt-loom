import { IMPLEMENTING_MEMBERS } from '../index.js'

type ImplementingRegistryCarrier = Record<
  symbol,
  Map<string, Set<string | symbol>> | undefined
>

/**
 * Adds `memberKey` to `ctor`'s OWN member set for `contractName`, creating
 * the `Map`/`Set` as needed. The own-property guard mirrors `registerFinal`
 * and `registerBacking` for the same reason: without it, a plain `??=` would
 * find an ancestor's registry and mutate it instead of creating this class's
 * own — `enforceImplementing` deliberately walks the chain itself to collect
 * inherited coverage, so each class must record only what IT marked.
 */
export function registerImplementing(
  ctor: object,
  contractName: string,
  memberKey: string | symbol
): void {
  const carrier = ctor as ImplementingRegistryCarrier
  if (!Object.prototype.hasOwnProperty.call(carrier, IMPLEMENTING_MEMBERS)) {
    // eslint-disable-next-line security/detect-object-injection
    carrier[IMPLEMENTING_MEMBERS] = new Map<string, Set<string | symbol>>()
  }
  // eslint-disable-next-line security/detect-object-injection
  const registry = carrier[IMPLEMENTING_MEMBERS]
  const members = registry?.get(contractName) ?? new Set<string | symbol>()
  members.add(memberKey)
  registry?.set(contractName, members)
}

/**
 * Reads `ctor`'s OWN member set for `contractName`. Inherited registries are
 * deliberately invisible here for the same reason as `ownFinalSet` — callers
 * that want inherited coverage (like `enforceImplementing`) walk the chain
 * themselves and merge each level's own set explicitly.
 */
export function ownImplementingSet(
  ctor: object,
  contractName: string
): Set<string | symbol> | undefined {
  if (!Object.prototype.hasOwnProperty.call(ctor, IMPLEMENTING_MEMBERS)) {
    return undefined
  }
  // eslint-disable-next-line security/detect-object-injection
  return (ctor as ImplementingRegistryCarrier)[IMPLEMENTING_MEMBERS]?.get(
    contractName
  )
}
