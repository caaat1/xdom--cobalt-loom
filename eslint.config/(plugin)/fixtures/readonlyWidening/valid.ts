export abstract class Base {
  abstract readonly abstractReadonly: string
  readonly concreteReadonly: string = 'base'
  mutable = 'base'
}

export class KeepsReadonlyEverywhereItMatters extends Base {
  override readonly abstractReadonly = 'kept'
  override readonly concreteReadonly = 'kept'
  // Base never marked `mutable` readonly, so nothing requires it here.
  override mutable = 'still mutable -- fine'
  // No ancestor relation for this name at all -- fine.
  brandNewField = 'no ancestor to match against'
}

export class NarrowingToReadonlyIsNotWidening extends Base {
  override readonly abstractReadonly = 'kept'
  // Narrower than the ancestor (adds readonly where Base had none) --
  // the rule only disallows going the other way.
  override readonly mutable = 'narrower, not widened'
}
