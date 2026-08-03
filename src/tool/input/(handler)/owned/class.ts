import { InputHandler } from '../../handler/class.js'

import { RejectionHandlerOwned } from './rejection/handler/class.js'
import type { RejectionPolicy } from './rejection/policy/type.js'

export abstract class InputHandlerOwned<
  TInput,
  TOwner extends object,
> extends InputHandler<TInput> {
  private static readonly onRejectedOwned: RejectionPolicy = ({
    input,
    owner,
  }): void => {
    new RejectionHandlerOwned({ input, owner })
  }
  protected readonly owner: TOwner
  constructor(param: { owner: TOwner }) {
    super()
    this.owner = param.owner
  }
  override set(input?: TInput): typeof this.owner {
    if (this.canSetSafely(input)) {
      this.setSafely(input)
    } else {
      InputHandlerOwned.onRejectedOwned({ input, owner: this.owner })
    }
    return this.owner
  }
}
