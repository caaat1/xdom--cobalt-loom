import type { InputHandlerOwned } from '../class.js'

export type NextHandlerMapOwned<TOwner extends object> = {
  [K in `_${string}_`]?: InputHandlerOwned<unknown, TOwner>
}
