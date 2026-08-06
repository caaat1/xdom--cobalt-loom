import type { _lf } from '../../../_lf/interface.js'
import type { UserInput } from '../type.js'

import { UserInputHandlerError } from './error.js'
import type { UserInputHandlerOwner } from './owner/type.js'
import type { RejectionPolicy } from './rejection/policy/type.js'

export abstract class UserInputHandler<
  T_UserInput extends UserInput,
  T_UserInputHandlerOwner extends UserInputHandlerOwner = undefined,
> implements _lf {
  protected input: T_UserInput | undefined
  protected readonly owner: T_UserInputHandlerOwner
  constructor(param: { owner: T_UserInputHandlerOwner }) {
    this.owner = param.owner
  }
  set(input?: T_UserInput): void {
    if (this.canSetSafely(input)) {
      this.setSafely(input)
      return
    }
    this.onRejected({ input, owner: this.owner })
  }
  /** @inheritdoc */
  _lf(): this {
    return this
  }
  protected setSafely(input: typeof this.input): void {
    this.input = input
  }
  protected abstract canSetSafely(value: unknown): value is typeof this.input
  protected onRejected: RejectionPolicy = ({ input, owner, message }): void => {
    throw new UserInputHandlerError(
      // exactOptionalPropertyTypes forbids passing `message: undefined`
      // explicitly — the key must be omitted entirely when absent.
      message === undefined ? { input, owner } : { input, owner, message }
    )
  }
}
