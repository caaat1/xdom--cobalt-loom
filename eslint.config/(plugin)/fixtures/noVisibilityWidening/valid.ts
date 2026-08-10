export class Base {
  protected protectedMember(): string {
    return 'base'
  }
  publicMember(): string {
    return 'base'
  }
}

export class KeepsAncestorVisibility extends Base {
  protected override protectedMember(): string {
    return 'kept'
  }
  override publicMember(): string {
    return 'kept'
  }
  // No ancestor relation at all -- fine regardless of its own visibility.
  private freshPrivateMember(): string {
    return 'no ancestor to compare against'
  }
}

// Narrowing (e.g. overriding `publicMember` as `protected`), and anything
// involving `private` on either side, aren't separate cases to cover here:
// TypeScript itself already rejects both as compile errors (TS2415)
// independent of this rule -- there's no valid fixture to write for them.
