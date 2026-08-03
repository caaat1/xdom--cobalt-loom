import { RejectionHandler } from '../../../../handler/rejection/handler/class.js'

export class RejectionHandlerOwned extends RejectionHandler {
  constructor(param: { input: unknown; owner: object | undefined }) {
    super(param)
  }
}
