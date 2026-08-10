export abstract class Base {
  abstract abstractMethod(): string
  abstract abstractProp: string
}

export class KeepsOverrideOnAbstractMembers extends Base {
  override abstractMethod(): string {
    return 'ok'
  }
  override abstractProp = 'ok'
}

export class AlsoHasAFreshMemberWithNoAncestorRelation extends Base {
  override abstractMethod(): string {
    return 'ok'
  }
  override abstractProp = 'ok'
  // No ancestor relation at all -- fine without override.
  freshMethod(): string {
    return 'no ancestor to compare against'
  }
}
