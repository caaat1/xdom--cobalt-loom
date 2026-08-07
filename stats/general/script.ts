import { spawn } from 'node:child_process'
import {
  globSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

import { format, resolveConfig } from 'prettier'

import { expandIncludeEntry, statsConfig } from './config.js'
import type { StatsConfig } from './config.js'

interface Snapshot {
  total: { byte: number; line: number; file: number }
  byte: { per: { line: number; file: number } }
  line: { per: { file: number } }
}

interface GraphEntry {
  t: string
  files: number
  lines: number
  bytes: number
  bpf: number
  lpf: number
}

export function snapshotLabel(filename: string): string {
  const base = filename.slice(0, -'.json'.length)
  const ti = base.indexOf('T')
  const [, month, day] = base.slice(0, ti).split('-')
  const [hour, minute] = base.slice(ti + 1).split('-')
  return `${month}/${day} ${hour}:${minute}`
}

// Indentation doesn't matter: render() immediately runs this back through
// Prettier (see its own comment on why), so the exact width JSON.stringify
// happens to use here is fully discarded either way.
function generateGraphData(entries: GraphEntry[]): string {
  return `const raw = ${JSON.stringify(entries)}\n`
}

const fmt = (n: number): string => n.toLocaleString('en-US')

export function createMdTable(
  headers: string[],
  alignments: ('left' | 'right')[],
  rows: string[][]
): string {
  const cols = headers.map((h, i): { right: boolean; width: number } => ({
    // eslint-disable-next-line security/detect-object-injection -- i is this same map's own loop index, not attacker input
    right: alignments[i] === 'right',
    width: Math.max(
      h.length,
      // eslint-disable-next-line security/detect-object-injection -- i is this same map's own loop index, not attacker input
      ...rows.map((r): number => r[i]?.length ?? 0)
    ),
  }))
  const fmtRow = (cells: string[]): string =>
    '| ' +
    cols
      .map((col, i): string => {
        // eslint-disable-next-line security/detect-object-injection -- i is this same map's own loop index, not attacker input
        const cell = cells[i] ?? ''
        return col.right ? cell.padStart(col.width) : cell.padEnd(col.width)
      })
      .join(' | ') +
    ' |'
  const sepRow =
    '| ' +
    cols
      .map((col): string =>
        col.right ? '-'.repeat(col.width - 1) + ':' : '-'.repeat(col.width)
      )
      .join(' | ') +
    ' |'
  return [fmtRow(headers), sepRow, ...rows.map(fmtRow)].join('\n')
}

// Fires the OS's own file-association handler at filePath, same effect as
// double-clicking it — `start`/`open`/`xdg-open` are shell/OS built-ins, not
// npm packages, so this needs no new dependency (see the stats note this
// script was ported under). The empty '' arg to `start` is the window-title
// slot `start` expects before a quoted path, not a stray no-op.
function openInBrowser(filePath: string): void {
  const [command, args] =
    process.platform === 'win32'
      ? ['cmd', ['/c', 'start', '', filePath]]
      : process.platform === 'darwin'
        ? ['open', [filePath]]
        : ['xdg-open', [filePath]]
  spawn(command, args, { detached: true, stdio: 'ignore' }).unref()
}

const MS_PER_SECOND = 1000
const SECONDS_PER_MINUTE = 60

// A script with no browser process to query has no way to ask "is a tab
// showing this page still open" — so this is a heuristic, not a fact: skip
// re-opening if we opened one recently enough that it's probably still
// sitting there. graph.html's own <meta http-equiv="refresh"> is what
// actually keeps that tab's content current in the meantime; this just
// avoids spawning a duplicate. Wrong only when the tab was closed inside
// the window, in which case the next render() past TAB_REOPEN_WINDOW_MS
// opens a fresh one anyway.
const REOPEN_WINDOW_MINUTES = 30
const TAB_REOPEN_WINDOW_MS =
  REOPEN_WINDOW_MINUTES * SECONDS_PER_MINUTE * MS_PER_SECOND

function openInBrowserIfStale(filePath: string): void {
  let lastOpen = 0
  try {
    lastOpen = Number(readFileSync(LAST_OPEN_MARKER, 'utf-8'))
  } catch {
    // no marker yet — never opened (or the file was cleaned up)
  }
  const sinceLastOpen = Date.now() - lastOpen
  if (sinceLastOpen < TAB_REOPEN_WINDOW_MS) {
    console.info(
      `Graph tab opened ${Math.round(sinceLastOpen / MS_PER_SECOND)}s ago — assuming it's still open and self-refreshing; skipping a new one.`
    )
    return
  }
  openInBrowser(filePath)
  mkdirSync(dirname(LAST_OPEN_MARKER), { recursive: true })
  writeFileSync(LAST_OPEN_MARKER, String(Date.now()))
}

// script.ts lives inside its own tool's asset folder now (stats/general/),
// so that folder *is* import.meta.dirname — no more deriving a sibling
// asset dir from the script's own filename stem.
const BASE_DIR = import.meta.dirname
const DATA_DIR = join(BASE_DIR, 'data')
const GRAPH_DIR = join(BASE_DIR, 'graph')
const GRAPH_DATA_JS = join(GRAPH_DIR, 'data.js')
const LATEST_MD = join(BASE_DIR, 'latest.md')
const GRAPH_HTML = join(BASE_DIR, 'graph.html')
// Nested under script/ (this tool's own code + private runtime state) rather
// than sitting alongside data/, graph/, latest.md (this tool's generated
// output for viewing) — and '-' prefixed: git-ignored and tsconfig-excluded
// by this repo's own scratch convention, since it's runtime state, not a
// tracked artifact.
const LAST_OPEN_MARKER = join(BASE_DIR, 'script', '-last-open')
// stats/<tool>/ always sits two levels under the project root, so this is
// stable regardless of the invoker's cwd — unlike a bare relative 'src'.
const PROJECT_ROOT = join(BASE_DIR, '..', '..')

// Dotfiles/dot-directories are skipped without needing to say so: it's
// fs.globSync's own default `**` behavior (verified empirically), the same
// outcome the previous hand-rolled recursive readdirSync walk got from its
// explicit `entry.name.startsWith('.')` check.
function scan(config: StatsConfig): {
  byte: number
  line: number
  file: number
} {
  const entries = globSync(config.include.map(expandIncludeEntry), {
    cwd: PROJECT_ROOT,
    exclude: config.exclude,
    withFileTypes: true,
  })
  let byte = 0
  let line = 0
  let file = 0
  for (const entry of entries) {
    if (!entry.isFile()) {
      continue
    }
    const content = readFileSync(join(entry.parentPath, entry.name))
    byte += content.byteLength
    line += content.toString().split('\n').length - 1
    file += 1
  }
  return { byte, line, file }
}

// Writes one new timestamped snapshot into data/ from a fresh scan of src/.
// Pure data collection — never touches latest.md or the graph, so it never
// needs to know how those are presented, and running it back-to-back is
// just "add another data point."
function collect(): void {
  const total = scan(statsConfig)
  const avg = {
    byte: {
      per: {
        line: Math.round(total.byte / total.line),
        file: Math.round(total.byte / total.file),
      },
    },
    line: {
      per: {
        file: Math.round(total.line / total.file),
      },
    },
  }
  mkdirSync(DATA_DIR, { recursive: true })
  // Drops the milliseconds + 'Z' toISOString() appends, leaving exactly
  // 'YYYY-MM-DDTHH:mm:ss' — computed from that literal rather than a bare
  // 19, so the slice length stays visibly tied to what it's actually
  // keeping.
  const isoSecondsLength = 'YYYY-MM-DDTHH:mm:ss'.length
  const timestamp = new Date()
    .toISOString()
    .slice(0, isoSecondsLength)
    .replaceAll(':', '-')
  const PRETTY_PRINT_INDENT = 2 // human-reviewable snapshot file, unlike graph/data.js this is never reformatted afterward
  writeFileSync(
    `${DATA_DIR}/${timestamp}.json`,
    JSON.stringify(
      { total, byte: avg.byte, line: avg.line },
      null,
      PRETTY_PRINT_INDENT
    ) + '\n'
  )
  console.info(`xDom stat`)
  console.info(
    `total
    byte ${fmt(total.byte)},
    line ${fmt(total.line)},
    file ${fmt(total.file)}`
  )
  console.info(
    `average
    byte/line ${fmt(avg.byte.per.line)},
    byte/file ${fmt(avg.byte.per.file)},
    line/file ${fmt(avg.line.per.file)}`
  )
}

// Regenerates latest.md and the graph entirely from whatever's already on
// disk in data/ — never scans src/ itself, so it reflects the current
// snapshot history regardless of whether collect() ran in this same
// process or days ago.
async function render(): Promise<void> {
  const filenames = readdirSync(DATA_DIR)
    .filter((f): boolean => f.endsWith('.json'))
    .sort()
  if (filenames.length === 0) {
    console.warn(
      `No snapshots in ${DATA_DIR} yet — nothing to render; run with --collect-only (or unflagged) first.`
    )
    return
  }
  const snapshots = filenames.map(
    (filename): { filename: string; snap: Snapshot } => ({
      filename,
      snap: JSON.parse(
        readFileSync(join(DATA_DIR, filename), 'utf-8')
      ) as Snapshot,
    })
  )
  const last = snapshots[snapshots.length - 1]
  if (last === undefined) {
    return // unreachable given the length check above; satisfies noUncheckedIndexedAccess
  }
  const { snap: latest } = last

  const totalTable = createMdTable(
    ['unit', 'count'],
    ['left', 'right'],
    [
      ['byte', fmt(latest.total.byte)],
      ['line', fmt(latest.total.line)],
      ['file', fmt(latest.total.file)],
    ]
  )
  const byteTable = createMdTable(
    ['per', 'value'],
    ['left', 'right'],
    [
      ['line', fmt(latest.byte.per.line)],
      ['file', fmt(latest.byte.per.file)],
    ]
  )
  const lineTable = createMdTable(
    ['per', 'value'],
    ['left', 'right'],
    [['file', fmt(latest.line.per.file)]]
  )
  writeFileSync(
    LATEST_MD,
    [
      '# xDom stat',
      '## total',
      totalTable,
      '## byte',
      byteTable,
      '## line',
      lineTable,
    ].join('\n\n') + '\n'
  )

  const entries: GraphEntry[] = snapshots.map(
    ({ filename, snap }): GraphEntry => ({
      t: snapshotLabel(filename),
      files: snap.total.file,
      lines: snap.total.line,
      bytes: snap.total.byte,
      bpf: snap.byte.per.file,
      lpf: snap.line.per.file,
    })
  )
  mkdirSync(GRAPH_DIR, { recursive: true })
  // JSON.stringify's own output (double-quoted keys/strings, no trailing
  // commas) never matches this project's Prettier style, so every
  // regeneration would otherwise re-break `format:check` on its own — run
  // it back through Prettier itself (already a devDependency) rather than
  // hand-replicating whatever .prettierrc currently says.
  const formattedGraphData = await format(generateGraphData(entries), {
    ...(await resolveConfig(GRAPH_DATA_JS)),
    filepath: GRAPH_DATA_JS,
  })
  writeFileSync(GRAPH_DATA_JS, formattedGraphData)

  openInBrowserIfStale(GRAPH_HTML)
  console.info(
    `Rendered latest.md + graph from ${filenames.length} snapshot(s).`
  )
}

// process.argv is [node executable, this script's path, ...actual args] —
// the standard Node CLI idiom for dropping the first two to get argv proper.
const ARGV_SCRIPT_OFFSET = 2

async function main(): Promise<void> {
  const args = process.argv.slice(ARGV_SCRIPT_OFFSET)
  const collectOnly = args.includes('--collect-only')
  const renderOnly = args.includes('--render-only')
  if (collectOnly && renderOnly) {
    throw new Error('--collect-only and --render-only are mutually exclusive')
  }
  if (!renderOnly) {
    collect()
  }
  if (!collectOnly) {
    await render()
  }
}

// Runs main() when this file is launched directly (`tsx stats/general/
// script.ts ...`), but not when script.test.ts imports it for its pure
// helpers — a plain top-level call would fire collect()/render()'s fs
// writes and browser-open as a side effect of merely importing the module.
if (
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await main()
}
