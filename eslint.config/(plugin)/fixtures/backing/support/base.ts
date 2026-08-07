// Shared ancestor for requireBackingMatchesAbstract.test.mjs's scenarios.
// No static counterpart to `abstract freshMethod` — TypeScript rejects
// `abstract`+`static` together outright (verified: "'static' modifier
// cannot be used with 'abstract' modifier", in either keyword order), so a
// declared-abstract static member can't exist for a fixture to even declare.
export abstract class Base {
  abstract freshMethod(): string
  concreteMethod(): string {
    return 'base concrete'
  }
  static concreteStatic(): string {
    return 'base concrete static'
  }
}
