import type { InputHandlerOwnedIntermediate } from '../../(owned)/intermediate/class.js'
import type { InputHandlerOwned } from '../class.js'
import type { NextHandlerMapOwned } from '../next/type.js'

export type InputMapOwned<
  TNext extends NextHandlerMapOwned<TOwner>,
  TOwner extends object,
> = {
  [K in keyof TNext]?: NonNullable<
    TNext[K]
  > extends InputHandlerOwnedIntermediate<infer TNextNested, TOwner>
    ? InputMapOwned<TNextNested, TOwner>
    : NonNullable<TNext[K]> extends InputHandlerOwned<infer TInput, TOwner>
      ? TInput
      : never
}
