import { backMethod } from './support/decorators.js'

// No `extends` clause at all — nothing could ever be backed here, instance
// or static. Covers the deliberate choice not to skip classes with zero
// base types (baseTypes.length === 0 is itself the violation, not a reason
// to bail out early).
export class ShouldFlagNoAncestorAtAll {
  @backMethod
  freshMethod(): string {
    return 'nothing to back'
  }
  @backMethod
  static freshStatic(): string {
    return 'nothing to back either'
  }
}
