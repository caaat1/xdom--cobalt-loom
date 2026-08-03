import { backMethod } from '../../../(decorator)/(member)/method/back/function.js'
import { isTraversable } from '../../../unknown/(object)/(notNull)/traversable/is/function.js'
import { InputHandler } from '../../handler/class.js'
import type { InputMap } from '../../handler/map/type.js'
import type { NextHandlerMap } from '../../handler/next/type.js'

import { setSafelyIntermediate } from './setSafely/function.js'

export abstract class InputHandlerIntermediate<
  T_Next extends NextHandlerMap,
> extends InputHandler<InputMap<T_Next>> {
  protected abstract next: T_Next
  @backMethod protected canSetSafely(
    value: unknown
  ): value is NonNullable<typeof this.input> {
    return isTraversable(value)
  }
  protected override setSafely(input: NonNullable<typeof this.input>): void {
    super.setSafely(input)
    setSafelyIntermediate(this, input, InputHandler)
  }
}
