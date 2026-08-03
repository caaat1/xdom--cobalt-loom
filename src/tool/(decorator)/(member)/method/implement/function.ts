export function implementMethod(
  _contractName: string
): (
  _target: object,
  _propertyKey?: string | symbol,
  descriptor?: PropertyDescriptor
) => PropertyDescriptor | void {
  return (
    _target: object,
    _propertyKey?: string | symbol,
    descriptor?: PropertyDescriptor
  ): PropertyDescriptor | void => descriptor
}
