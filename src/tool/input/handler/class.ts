import { RejectionHandler } from './rejection/handler/class.js'
import type { RejectionPolicy } from './rejection/policy/type.js'

export abstract class InputHandler<TInput> {
  private static readonly onRejected: RejectionPolicy = ({ input }): void => {
    new RejectionHandler({ input })
  }
  input: TInput | undefined
  set(input?: TInput): void {
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
