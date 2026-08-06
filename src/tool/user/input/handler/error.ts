import type { UserInputHandlerOwner } from './owner/type.js'

export class UserInputHandlerError extends Error {
  constructor(param: {
    input: unknown
    owner: UserInputHandlerOwner
    message?: string
  }) {
    super(
      param.message ??
        `UserInputHandler: rejected input of type ${typeof param.input}`
    )
    this.name = this.constructor.name
  }
}
