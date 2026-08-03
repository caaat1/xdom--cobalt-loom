import { registerClassMember } from '../../../member/register.js'

export function backField(target: object, propertyKey: string | symbol): void {
  registerClassMember(target, propertyKey, '__xDom_backing__')
}
// export default backAbstractField
