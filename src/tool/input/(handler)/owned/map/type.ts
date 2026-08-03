import type { InputHandlerOwnedIntermediate } from '../../(owned)/intermediate/class.js'
import type { InputHandlerOwned } from '../class.js'
import type { NextHandlerMapOwned } from '../next/type.js'

export type InputMapOwned<
  T_Next extends NextHandlerMapOwned<T_Owner>,
  T_Owner extends object,
> = {
  [K in keyof T_Next]?: NonNullable<
    T_Next[K]
  > extends InputHandlerOwnedIntermediate<infer TNextNested, T_Owner>
    ? InputMapOwned<TNextNested, T_Owner>
    : NonNullable<T_Next[K]> extends InputHandlerOwned<infer T_Input, T_Owner>
      ? T_Input
      : never
}
