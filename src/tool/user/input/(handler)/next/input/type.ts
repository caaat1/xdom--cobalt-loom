import type { UserInputHandler } from '../../../handler/class.js'
import type { UserInputHandlerOwner } from '../../../handler/owner/type.js'
import type { UserInputHandlerIntermediate } from '../../intermediate/class.js'
import type { UserInputHandlerNextMap } from '../map/type.js'

export type UserInputHandlerNextInput<
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
    ? UserInputHandlerNextInput<
        T_UserInputHandlerNextMapNested,
        T_UserInputHandlerOwner
      >
    : NonNullable<T_UserInputHandlerNextMap[K]> extends UserInputHandler<
          infer T_Input,
          T_UserInputHandlerOwner
        >
      ? T_Input
      : never
}
