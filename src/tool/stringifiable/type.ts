type StringifiableSamples = typeof stringifiableSamples
export const stringifiableSamples: {
  string: string
  boolean: boolean
  number: number
  symbol: symbol
  bigint: bigint
} = {
  string: '',
  boolean: true,
  number: 0,
  symbol: Symbol(),
  bigint: 0n,
} as const satisfies {
  [K in keyof StringifiableSamples]: StringifiableSamples[K]
}
export type Stringifiable = StringifiableSamples[keyof StringifiableSamples]
