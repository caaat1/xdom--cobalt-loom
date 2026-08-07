// Local stand-ins for src/tool/(decorator)/(member)/{method,property}/back/
// function.ts — kept separate from the real functions so these fixtures
// don't depend on src/'s internal layout, since
// requireBackingMatchesAbstract.mjs matches decorators by name (`backMethod`/
// `backProperty`), never by resolving them back to a declaration. Same
// legacy decorator signatures as the real ones, trivial bodies.
export function backMethod(
  target: object,
  propertyKey?: string | symbol,
  descriptor?: PropertyDescriptor
): PropertyDescriptor | void {
  void target
  void propertyKey
  return descriptor
}

export function backProperty(target: object, propertyKey: string): void {
  void target
  void propertyKey
}
