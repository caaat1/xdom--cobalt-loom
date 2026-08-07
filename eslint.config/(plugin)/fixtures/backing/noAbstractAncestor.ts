import { backProperty } from './support/decorators.js'
import { Base } from './support/base.js'

// Instance-only: a static member has no "must correspond to a declared
// abstract ancestor" check to fail in the first place (see
// requireBackingMatchesAbstract.mjs), so there is no static counterpart to
// this scenario — a fresh static @backMethod/@backProperty with no relation
// to any ancestor is always valid (see valid.ts's ShouldPass.freshStatic).
export class ShouldFlagNoAbstractInstance extends Base {
  freshMethod(): string {
    return 'ok'
  }
  @backProperty
  extra = 'nothing on Base by this name'
}
