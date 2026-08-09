// @ts-check
import { dirname } from 'node:path'

import { findUpSync } from 'find-up'

/**
 * Nearest ancestor directory containing package.json, walking up from
 * `cwd`. Marker-based, so dev tooling stays correct regardless of how deep
 * it sits under the project root — no hand-counted `resolve(dirname, '..',
 * ...)` tying a script's behavior to its own file-tree position.
 *
 * Lives here rather than under any one consumer because more than one
 * needs it (eslint.config/'s base/stats/test configs, stats/general's own
 * script) — root-relative path finding is project-wide infrastructure, not
 * something owned by whichever tree happened to need it first. Consumers
 * outside repo/ import it straight across the tree boundary; the per-tree
 * tsconfig boundaries elsewhere in this project (see repo/tsconfig.json's
 * own header) exist for the editor's language service, not to wall off
 * plain ES module imports.
 *
 * @param {string} cwd
 * @returns {string}
 */
export function findProjectRootDir(cwd) {
  const packageJsonPath = findUpSync('package.json', { cwd })
  if (!packageJsonPath) {
    throw new Error(`findProjectRootDir: no package.json found above ${cwd}`)
  }
  return dirname(packageJsonPath)
}
