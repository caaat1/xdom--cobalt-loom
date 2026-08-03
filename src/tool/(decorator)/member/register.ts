export function registerClassMember(
  target: object,
  propertyKey: string | symbol,
  metaKey: string
): void {
  try {
    const proto: unknown =
      target != undefined && typeof target === 'function'
        ? (target as { prototype: unknown }).prototype
        : target
    if (proto != undefined) {
      if (!Object.prototype.hasOwnProperty.call(proto, metaKey)) {
        Object.defineProperty(proto, metaKey, {
          value: Object.create(null),
          enumerable: false,
          configurable: false,
          writable: false,
        })
      }
      const name =
        typeof propertyKey === 'symbol'
          ? propertyKey.toString()
          : String(propertyKey)
      const metaObject = proto[metaKey as keyof typeof proto] as Record<
        string,
        boolean
      >
      Object.defineProperty(metaObject, name, {
        value: true,
        enumerable: false,
        configurable: false,
        writable: false,
      })
    }
  } catch {
    // swallow errors to keep decorators non-intrusive
  }
}
