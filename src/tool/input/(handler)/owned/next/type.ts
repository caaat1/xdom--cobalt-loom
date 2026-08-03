import type { InputHandlerOwned } from '../class.js'

export type NextHandlerMapOwned<T_Owner extends object> = {
  [K in `_${string}_`]?: InputHandlerOwned<unknown, T_Owner>
}
