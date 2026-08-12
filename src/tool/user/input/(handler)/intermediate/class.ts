import { isTraversable } from '../../../../unknown/(object)/(notNull)/traversable/is/function.js'
import { UserInputHandler } from '../../handler/class.js'
import type { UserInputHandlerOwner } from '../../handler/owner/type.js'
import type { UserInputNext } from '../../next/type.js'
import type { UserInputHandlerNextMap } from '../next/map/type.js'

export abstract class UserInputHandlerIntermediate<
  T_UserInputHandlerNextMap extends
    UserInputHandlerNextMap<T_UserInputHandlerOwner>,
  T_UserInputHandlerOwner extends UserInputHandlerOwner = undefined,
> extends UserInputHandler<
  UserInputNext<T_UserInputHandlerNextMap, T_UserInputHandlerOwner>,
  T_UserInputHandlerOwner
> {
  protected abstract child: T_UserInputHandlerNextMap
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
    input: UserInputNext<T_UserInputHandlerNextMap, T_UserInputHandlerOwner>
  ): void {
    super.setSafely(input)
    Object.entries(input).forEach(([key, value]: [string, unknown]): void => {
      // eslint-disable-next-line security/detect-object-injection
      const nextHandler = this.child[key]
      nextHandler?.set(value)
    })
  }
}
