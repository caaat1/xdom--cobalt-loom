export type Guarded<F> = F extends (
  x: unknown,
  ...rest: unknown[]
) => x is infer T
  ? T
  : never
