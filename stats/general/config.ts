/**
 * Which files this tool scans — glob patterns resolved against the project
 * root (script.ts's PROJECT_ROOT), the same two-levels-up anchor point
 * BASE_DIR itself already uses, so this stays stable regardless of the
 * invoker's cwd. Deliberately shaped like tsconfig.json's own
 * `include`/`exclude` rather than a single hardcoded path or an env var: an
 * env var can only ever hold one string, and this needed to become
 * pattern-capable (multiple roots, exclusions) the same way tsconfig's
 * `include` already is — no reason to invent a narrower vocabulary for the
 * same idea. A typed module (checked by stats/tsconfig.json) over a JSON
 * config file for the same reason this repo's own eslint.config/ is
 * `.mjs` modules rather than `.eslintrc.json`: real comments, and a rename
 * here is a compile error everywhere it's used instead of a silently
 * stale key.
 */
export interface StatsConfig {
  /**
   * Bare directory entries (no glob metacharacters: `* ? [ ] { }`) are
   * expanded to `<dir>/**\/*` — same default-inclusion shorthand
   * tsconfig.json's own `include` uses for a plain directory name. Written
   * out in full where recursion isn't wanted.
   */
  readonly include: readonly string[]
  /**
   * Glob patterns to exclude on top of `include`. Dotfiles/dot-directories
   * are already skipped unconditionally (fs.globSync's own `**` default,
   * matching this tool's previous hand-rolled scan) — this is for anything
   * further.
   */
  readonly exclude?: readonly string[]
}

export const statsConfig: StatsConfig = {
  include: ['src'],
  exclude: [],
}

const GLOB_METACHARACTER = /[*?[\]{}]/

export function expandIncludeEntry(entry: string): string {
  return GLOB_METACHARACTER.test(entry) ? entry : `${entry}/**/*`
}
