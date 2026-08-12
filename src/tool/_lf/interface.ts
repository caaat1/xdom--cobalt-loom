/**
 * A no-op, chainable identity method. Add `._lf()` as the first or last
 * call in a chain purely to influence formatting: it nudges Prettier into
 * stacking the chain one call per line, and — placed last — gives the
 * chain a disposable final line, so calls above it can be added or removed
 * without having to shuffle trailing punctuation (a closing `)` from a
 * wrapping expression, a trailing `,`, ...) onto a different line.
 */
export interface _lf {
  // Method syntax is load-bearing here: `this` as a return type only
  // resolves to "whatever concrete subtype this was called on" inside a
  // method signature. A property/arrow-function type can't express that —
  // it would have to fall back to the interface's own `_lf` type, losing the
  // polymorphism the chainable no-op depends on.
  // eslint-disable-next-line @typescript-eslint/method-signature-style -- polymorphic `this` return type requires method syntax; see comment above
  _lf(): this
}
