export abstract class Base {
  abstract abstractMethod(): string
  abstract abstractProp: string
}

export class ShouldFlagMissingOverrideOnMethod extends Base {
  abstractMethod(): string {
    return 'missing override'
  }
  override abstractProp = 'ok'
}

export class ShouldFlagMissingOverrideOnProperty extends Base {
  override abstractMethod(): string {
    return 'ok'
  }
  abstractProp = 'missing override'
}
