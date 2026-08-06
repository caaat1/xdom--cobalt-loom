type StringifiableSample = typeof stringifiableSample
const stringifiableSample: {
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
  [K in keyof StringifiableSample]: StringifiableSample[K]
}
void stringifiableSample
export type Stringifiable = StringifiableSample[keyof StringifiableSample]
