import type { InputHandler } from '../../../handler/class.js'

export function setSafelyIntermediate(
  instance: object,
  input: object,
  HandlerClass: abstract new (param: { owner: object }) => InputHandler<unknown>
): void {
  Object.entries(input).forEach(([key, value]: [string, unknown]): void => {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      return
    }
    const child: unknown = instance[key as keyof typeof instance]
    if (child instanceof HandlerClass) {
      child.set(value)
    }
  })
}
