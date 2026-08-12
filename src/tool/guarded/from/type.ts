export type GuardedFrom<T_TypeGuard> = T_TypeGuard extends (
  x: unknown,
  ...rest: unknown[]
) => x is infer T
  ? T
  : never
