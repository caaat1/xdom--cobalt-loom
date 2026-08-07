import { backMethod } from './support/decorators.js'
import { Base } from './support/base.js'

export class ShouldFlagInstanceShadow extends Base {
  @backMethod
  override concreteMethod(): string {
    return 'shadowed'
  }
}

export class ShouldFlagStaticShadow extends Base {
  freshMethod(): string {
    return 'ok'
  }
  static freshStatic(): string {
    return 'ok'
  }
  @backMethod
  static override concreteStatic(): string {
    return 'shadowed static'
  }
}
