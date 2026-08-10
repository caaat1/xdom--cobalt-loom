export abstract class Base {
  abstract readonly abstractReadonly: string
  readonly concreteReadonly: string = 'base'
}

export class ShouldFlagDroppingAbstractAncestorReadonly extends Base {
  override abstractReadonly = 'dropped'
  override readonly concreteReadonly = 'kept'
}

export class ShouldFlagDroppingConcreteAncestorReadonly extends Base {
  override readonly abstractReadonly = 'kept'
  override concreteReadonly = 'dropped'
}
