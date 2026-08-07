import { backMethod } from './support/decorators.js'
import { Base } from './support/base.js'

export class ShouldPass extends Base {
  @backMethod
  freshMethod(): string {
    return 'fresh'
  }
  @backMethod
  static freshStatic(): string {
    return 'fresh static'
  }
}
