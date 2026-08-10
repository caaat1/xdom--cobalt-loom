export class Base {
  protected protectedMember(): string {
    return 'base'
  }
}

export class ShouldFlagProtectedToPublic extends Base {
  override protectedMember(): string {
    return 'widened'
  }
}
