import { backMethod } from './support/decorators.js'

// No `extends` clause at all. Covers the deliberate choice not to skip
// classes with zero base types for instance members (baseTypes.length === 0
// is itself the violation, not a reason to bail out early) — freshStatic
// stays unflagged alongside it: statics only ever check for shadowing a
// concrete ancestor, and there is none here either.
export class ShouldFlagNoAncestorAtAll {
  @backMethod
  freshMethod(): string {
    return 'nothing to back'
  }
  @backMethod
  static freshStatic(): string {
    return 'nothing to back either, but not a violation — see support/base.ts'
  }
}
