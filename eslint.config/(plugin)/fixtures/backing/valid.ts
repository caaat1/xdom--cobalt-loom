import { backMethod } from './support/decorators.js'
import { Base } from './support/base.js'

export class ShouldPass extends Base {
  @backMethod
  freshMethod(): string {
    return 'fresh'
  }
  // No relation to Base at all, abstract or concrete — valid regardless,
  // since a static member can only ever be checked for shadowing a concrete
  // ancestor (see requireBackingMatchesAbstract.mjs's own comment on why).
  @backMethod
  static freshStatic(): string {
    return 'fresh static'
  }
}
