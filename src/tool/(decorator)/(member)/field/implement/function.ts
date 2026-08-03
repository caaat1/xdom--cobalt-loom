export function implementField(
  _contractName: string
): (_target: object, _propertyKey?: string | symbol) => void {
  return (_target: object, _propertyKey?: string | symbol): void => undefined
}
