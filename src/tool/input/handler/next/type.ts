import type { InputHandler } from '../class.js'

export type NextHandlerMap = {
  [K in `_${string}_`]?: InputHandler<unknown>
}
