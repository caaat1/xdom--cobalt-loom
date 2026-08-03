import { registerClassMember } from '../../../member/register.js'

export function backMethod(
  target: object,
  propertyKey?: string | symbol,
  descriptor?: PropertyDescriptor
): PropertyDescriptor | void {
  if (propertyKey != undefined) {
    registerClassMember(target, propertyKey, '__xDom_implementation__')
  }
  return descriptor
}
// export default backAbstractMethod
