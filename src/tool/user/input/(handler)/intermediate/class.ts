import { isTraversable } from '../../../../unknown/(object)/(notNull)/traversable/is/function.js'
import { UserInputHandler } from '../../handler/class.js'
import type { UserInputHandlerOwner } from '../../handler/owner/type.js'
import type { UserInputHandlerNextInput } from '../next/input/type.js'
import type { UserInputHandlerNextMap } from '../next/map/type.js'

export abstract class UserInputHandlerIntermediate<
  T_InputHandlerNextMap extends UserInputHandlerNextMap<T_InputHandlerOwner>,
  T_InputHandlerOwner extends UserInputHandlerOwner = undefined,
> extends UserInputHandler<
  UserInputHandlerNextInput<T_InputHandlerNextMap, T_InputHandlerOwner>,
  T_InputHandlerOwner
> {
  protected abstract child: T_InputHandlerNextMap
  protected override canSetSafely(
    value: unknown
  ): value is NonNullable<typeof this.input> {
    return (
      isTraversable(value) &&
      // hasOwn (not `in`) so a key like '__proto__' or 'constructor' can
      // never pass by resolving through the prototype chain instead of an
      // actual declared child.
      Object.keys(value).every((key): boolean => Object.hasOwn(this.child, key))
    )
  }
  protected override setSafely(
    input: UserInputHandlerNextInput<T_InputHandlerNextMap, T_InputHandlerOwner>
  ): void {
    super.setSafely(input)
    Object.entries(input).forEach(([key, value]: [string, unknown]): void => {
      // eslint-disable-next-line security/detect-object-injection
      const nextHandler = this.child[key]
      nextHandler?.set(value)
    })
  }
}
