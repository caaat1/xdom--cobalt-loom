import type { InputHandlerIntermediate } from '../../(handler)/intermediate/class.js'
import type { InputHandler } from '../class.js'
import type { NextHandlerMap } from '../next/type.js'

export type InputMap<T_Next extends NextHandlerMap> = {
  [K in keyof T_Next]?: NonNullable<T_Next[K]> extends InputHandlerIntermediate<
    infer TNextNested
  >
    ? InputMap<TNextNested>
    : NonNullable<T_Next[K]> extends InputHandler<infer T_Input>
      ? T_Input
      : never
}
