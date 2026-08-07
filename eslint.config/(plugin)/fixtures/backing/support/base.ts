// Shared ancestor for requireBackingMatchesAbstract.test.mjs's scenarios:
// one abstract, one concrete member on each of the instance/static sides.
export abstract class Base {
  abstract freshMethod(): string
  concreteMethod(): string {
    return 'base concrete'
  }
  static abstract freshStatic(): string
  static concreteStatic(): string {
    return 'base concrete static'
  }
}
