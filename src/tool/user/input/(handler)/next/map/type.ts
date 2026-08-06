import type { UserInputHandler } from '../../../handler/class.js'
import type { UserInputHandlerOwner } from '../../../handler/owner/type.js'

export type UserInputHandlerNextMap<
  T_UserInputHandlerOwner extends UserInputHandlerOwner,
> = {
  [key: string]: UserInputHandler<unknown, T_UserInputHandlerOwner> | undefined
}
