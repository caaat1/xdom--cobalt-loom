// @ts-check
// Populates every ".window-title.md" banner file under the project root
// with a <window-title> element naming its immediate containing folder:
//
//   <!-- markdownlint-disable-file MD041 -->
//
//   <window-title>FolderName</window-title>
//
// Overwrites unconditionally, whether the file was empty or already had
// content — the folder name is the only source of truth, so a stale or
// hand-edited banner is exactly what this exists to correct.
import { readdirSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

import { findProjectRootDir } from '../findProjectRootDir.mjs'

const projectRootDir = findProjectRootDir(import.meta.dirname)

const targetFilename = '.window-title.md'

// Directories never worth descending into: vcs/tooling dirs (anything
// dot-prefixed, e.g. .git, .husky, .vscode), house scratch conventions
// (leading -, &, temp/tmp — see root .gitignore), and build output.
const isSkippableDir = (/** @type {string} */ name) =>
  name.startsWith('.') ||
  name.startsWith('-') ||
  name.startsWith('&') ||
  name === 'temp' ||
  name === 'tmp' ||
  name === 'node_modules' ||
  name === 'dist'

// Pure and exported so sync.test.mjs can pin the rendered banner down
// without touching the filesystem.
export const renderContent = (/** @type {string} */ folderName) =>
  `<!-- markdownlint-disable-file MD041 -->\n\n<window-title>${folderName}</window-title>\n`

/** @returns {string[]} */
function findWindowTitleFiles(/** @type {string} */ dir) {
  const found = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (isSkippableDir(entry.name)) continue
      found.push(...findWindowTitleFiles(join(dir, entry.name)))
    } else if (entry.isFile() && entry.name === targetFilename) {
      found.push(join(dir, entry.name))
    }
  }
  return found
}

function main() {
  const files = findWindowTitleFiles(projectRootDir)

  if (files.length === 0) {
    console.log(`No ${targetFilename} files found under ${projectRootDir}`)
    return
  }

  for (const file of files) {
    const folderName = basename(dirname(file))
    writeFileSync(file, renderContent(folderName), 'utf8')
    console.log(`wrote ${file} <- "${folderName}"`)
  }
}

// Runs main() when this file is launched directly (`node
// repo/window-title/sync.mjs`), but not when sync.test.mjs imports it for
// `renderContent` — a plain top-level call would fire real filesystem
// writes as a side effect of merely importing the module.
if (
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main()
}
