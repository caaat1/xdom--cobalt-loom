/**
 * A no-op, chainable identity method. Add `._lf()` as the first or last
 * call in a chain purely to influence formatting: it nudges Prettier into
 * stacking the chain one call per line, and — placed last — gives the
 * chain a disposable final line, so calls above it can be added or removed
 * without having to shuffle the trailing `;` onto a different line.
 */
export interface _lf {
  _lf(): this
}
