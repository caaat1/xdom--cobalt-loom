import type { InputHandlerIntermediate } from '../../(handler)/intermediate/class.js'
import type { InputHandler } from '../class.js'
import type { NextHandlerMap } from '../next/type.js'

export type InputMap<TNext extends NextHandlerMap> = {
  [K in keyof TNext]?: NonNullable<TNext[K]> extends InputHandlerIntermediate<
    infer TNextNested
  >
    ? InputMap<TNextNested>
    : NonNullable<TNext[K]> extends InputHandler<infer TInput>
      ? TInput
      : never
}
