import { backMethod, backProperty } from './support/decorators.js'
import { Base } from './support/base.js'

export class ShouldFlagNoAbstractInstance extends Base {
  freshMethod(): string {
    return 'ok'
  }
  static freshStatic(): string {
    return 'ok'
  }
  @backProperty
  extra = 'nothing on Base by this name'
}

export class ShouldFlagNoAbstractStatic extends Base {
  freshMethod(): string {
    return 'ok'
  }
  static freshStatic(): string {
    return 'ok'
  }
  @backMethod
  static extraStatic(): string {
    return 'nothing on Base by this name either'
  }
}
