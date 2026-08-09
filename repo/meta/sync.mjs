// @ts-check
// Syncs package.json metadata (the single source of truth) to the GitHub repo:
//   description + homepage -> the About box, keywords -> Topics.
// Topics use a PUT (full replace), so keywords removed from package.json
// retire their topics too. Wired into .husky/pre-push as a non-fatal step —
// requires gh CLI authenticated and the remote repo to exist.
// Guards, in order: (1) no repository.url at all — expected for a project
// that hasn't picked a GitHub home yet, so skip rather than crash on
// `repository.url` of undefined; (2) repository.url disagrees with `git
// remote origin` — skipped with a warning instead of editing whatever the
// field points at, since the field only changes by hand and must never be
// allowed to silently lie.
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import { findProjectRootDir } from '../findProjectRootDir.mjs'

const projectRootDir = findProjectRootDir(import.meta.dirname)
const { description, homepage, keywords, repository } = JSON.parse(
  readFileSync(resolve(projectRootDir, 'package.json'), 'utf8')
)

// hook environments may lack gh on PATH; Windows installer's default location
const gh =
  process.platform === 'win32' ? 'C:\\Program Files\\GitHub CLI\\gh.exe' : 'gh'

// Reduces any GitHub URL spelling (git+https, ssh, .git, trailing /) to
// "owner/name" — exported so sync.test.mjs can pin its regex behavior down
// without touching git/gh, which the rest of this module shells out to.
export const normalize = (/** @type {string} */ url) =>
  url
    .trim()
    .replace(/^git\+/, '')
    .replace(/\/+$/, '')
    .replace(/\.git$/, '')
    .replace(/^git@github\.com:/, '')
    .replace(/^(https?|ssh):\/\/(git@)?github\.com\//, '')
    .toLowerCase()

function main() {
  if (!repository?.url) {
    console.warn(
      '⚠️ package.json has no repository.url yet — sync skipped; add one once this project has a GitHub home.'
    )
    process.exitCode = 1
    return
  }
  const repo = normalize(repository.url)

  let remote = ''
  try {
    remote = execFileSync('git', ['remote', 'get-url', 'origin'], {
      encoding: 'utf8',
    })
  } catch {
    // not a git repo yet, or no origin configured — nothing to check against
  }

  if (remote && normalize(remote) !== repo) {
    console.warn(
      `⚠️ repository.url resolves to "${repo}" but git remote origin is ` +
        `"${normalize(remote)}" — sync skipped; reconcile the two by hand.`
    )
    process.exitCode = 1
    return
  }

  const editFlags = []
  if (description) {
    editFlags.push('--description', description)
  }
  if (homepage) {
    editFlags.push('--homepage', homepage)
  }
  if (editFlags.length > 0) {
    execFileSync(gh, ['repo', 'edit', repo, ...editFlags], {
      stdio: 'inherit',
    })
  }

  // GitHub topics must be lowercase (alphanumerics and hyphens, max 50 chars)
  const topics = (keywords ?? []).map((/** @type {string} */ k) =>
    k.toLowerCase()
  )
  if (topics.length > 0) {
    execFileSync(
      gh,
      [
        'api',
        '-X',
        'PUT',
        `repos/${repo}/topics`,
        ...topics.flatMap((/** @type {string} */ t) => ['-f', `names[]=${t}`]),
      ],
      { stdio: 'inherit' }
    )
  } else {
    // -f cannot express an empty array; send an explicit empty set via stdin
    execFileSync(
      gh,
      ['api', '-X', 'PUT', `repos/${repo}/topics`, '--input', '-'],
      {
        input: '{"names":[]}',
        stdio: ['pipe', 'inherit', 'inherit'],
      }
    )
  }
}

// Runs main() when this file is launched directly (`node repo/meta/
// sync.mjs`), but not when sync.test.mjs imports it for `normalize` — a
// plain top-level call would fire real `gh`/`git` child processes (and,
// once repository.url exists, real GitHub API writes) as a side effect of
// merely importing the module.
if (
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main()
}
