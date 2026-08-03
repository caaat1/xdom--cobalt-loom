import { InputHandler } from '../../handler/class.js'

import { RejectionHandlerOwned } from './rejection/handler/class.js'
import type { RejectionPolicy } from './rejection/policy/type.js'

export abstract class InputHandlerOwned<
  T_Input,
  T_Owner extends object,
> extends InputHandler<T_Input> {
  private static readonly onRejectedOwned: RejectionPolicy = ({
    input,
    owner,
  }): void => {
    new RejectionHandlerOwned({ input, owner })
  }
  protected readonly owner: T_Owner
  constructor(param: { owner: T_Owner }) {
    super()
    this.owner = param.owner
  }
  override set(input?: T_Input): typeof this.owner {
    if (this.canSetSafely(input)) {
      this.setSafely(input)
    } else {
      InputHandlerOwned.onRejectedOwned({ input, owner: this.owner })
    }
    return this.owner
  }
}
