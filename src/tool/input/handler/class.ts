import type { _lf } from '../../_lf/interface.js'

import { RejectionHandler } from './rejection/handler/class.js'
import type { RejectionPolicy } from './rejection/policy/type.js'

export abstract class InputHandler<T_Input> implements _lf {
  private static readonly onRejected: RejectionPolicy = ({ input }): void => {
    new RejectionHandler({ input })
  }
  input: T_Input | undefined
  set(input?: T_Input): void {
    if (this.canSetSafely(input)) {
      this.setSafely(input)
    } else {
      InputHandler.onRejected({ input })
    }
  }
  _lf(): this {
    return this
  }
  protected setSafely(input: NonNullable<typeof this.input>): void {
    this.input = input
  }
  protected abstract canSetSafely(
    value: unknown
  ): value is NonNullable<typeof this.input>
}
