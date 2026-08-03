export class RejectionHandler {
  readonly message = 'InputHandler: input rejected'
  constructor(param: { input: unknown }) {
    console.warn(this.message, param)
  }
}
