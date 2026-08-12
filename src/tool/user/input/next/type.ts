import type { UserInputHandlerIntermediate } from '../(handler)/intermediate/class.js'
import type { UserInputHandlerNextMap } from '../(handler)/next/map/type.js'
import type { UserInputHandler } from '../handler/class.js'
import type { UserInputHandlerOwner } from '../handler/owner/type.js'

export type UserInputNext<
  T_UserInputHandlerNextMap extends
    UserInputHandlerNextMap<T_UserInputHandlerOwner>,
  T_UserInputHandlerOwner extends UserInputHandlerOwner = undefined,
> = {
  [K in keyof T_UserInputHandlerNextMap]?: NonNullable<
    T_UserInputHandlerNextMap[K]
  > extends UserInputHandlerIntermediate<
    infer T_UserInputHandlerNextMapNested,
    T_UserInputHandlerOwner
  >
    ? UserInputNext<T_UserInputHandlerNextMapNested, T_UserInputHandlerOwner>
    : NonNullable<T_UserInputHandlerNextMap[K]> extends UserInputHandler<
          infer T_UserInput,
          T_UserInputHandlerOwner
        >
      ? T_UserInput
      : never
}
