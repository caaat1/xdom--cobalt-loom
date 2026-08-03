import { backMethod } from '../../../../(decorator)/(member)/method/back/function.js'
import { isTraversable } from '../../../../unknown/(object)/(notNull)/traversable/is/function.js'
import { setSafelyIntermediate } from '../../intermediate/setSafely/function.js'
import { InputHandlerOwned } from '../../owned/class.js'
import type { InputMapOwned } from '../../owned/map/type.js'
import type { NextHandlerMapOwned } from '../../owned/next/type.js'

export abstract class InputHandlerOwnedIntermediate<
  T_Next extends NextHandlerMapOwned<T_Owner>,
  T_Owner extends object,
> extends InputHandlerOwned<InputMapOwned<T_Next, T_Owner>, T_Owner> {
  protected abstract next: T_Next
  @backMethod protected canSetSafely(
    value: unknown
  ): value is NonNullable<typeof this.input> {
    return isTraversable(value)
  }
  protected override setSafely(input: NonNullable<typeof this.input>): void {
    super.setSafely(input)
    setSafelyIntermediate(this, input, InputHandlerOwned)
  }
}
