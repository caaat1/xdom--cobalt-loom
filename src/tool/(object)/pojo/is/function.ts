export function isPojo(obj: object): boolean {
  const prototype: object | null = Object.getPrototypeOf(obj) as object | null
  return prototype === null || prototype === Object.prototype
}
