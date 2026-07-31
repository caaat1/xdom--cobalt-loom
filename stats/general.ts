import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import path, { join } from 'node:path'

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

function snapshotLabel(filename: string): string {
  const base = filename.slice(0, -5) // strip .json
  const ti = base.indexOf('T')
  const d = base.slice(0, ti).split('-')
  const t = base.slice(ti + 1).split('-')
  return `${d[1]}/${d[2]} ${t[0]}:${t[1]}`
}

function generateGraphData(entries: GraphEntry[]): string {
  return `const raw = ${JSON.stringify(entries, null, 2)}\n`
}
const BASE_DIR = import.meta.dirname
const SCRIPT_NAME = import.meta.filename
const SCRIPT_NAME_STUB = path.basename(SCRIPT_NAME, path.extname(SCRIPT_NAME))
const ASSET_DIR = join(BASE_DIR, SCRIPT_NAME_STUB)
const DATA_DIR = join(ASSET_DIR, 'data')
const GRAPH_DIR = join(ASSET_DIR, 'graph')
const LATEST_MD = join(ASSET_DIR, 'latest.md')
// stats/ always sits directly under the project root, so this is stable
// regardless of the invoker's cwd — unlike a bare relative 'src'.
const SRC_DIR = join(BASE_DIR, '..', 'src')
function scan(dir: string): { byte: number; line: number; file: number } {
  let byte = 0
  let line = 0
  let file = 0
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) {
      continue
    }
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      const sub = scan(path)
      byte += sub.byte
      line += sub.line
      file += sub.file
    } else if (entry.isFile()) {
      const content = readFileSync(path)
      byte += content.byteLength
      line += content.toString().split('\n').length - 1
      file += 1
    }
  }
  return { byte, line, file }
}
const total = scan(SRC_DIR)
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
const timestamp = new Date().toISOString().slice(0, 19).replaceAll(':', '-')
writeFileSync(
  `${DATA_DIR}/${timestamp}.json`,
  JSON.stringify({ total, byte: avg.byte, line: avg.line }, null, 2) + '\n'
)
const fmt = (n: number): string => n.toLocaleString('en-US')
{
  function createMdTable(
    headers: string[],
    alignments: ('left' | 'right')[],
    rows: string[][]
  ): string {
    const cols = headers.map((h, i) => ({
      right: alignments[i] === 'right',
      width: Math.max(h.length, ...rows.map((r) => r[i]?.length ?? 0)),
    }))
    const fmtRow = (cells: string[]): string =>
      '| ' +
      cols
        .map((col, i) => {
          const cell = cells[i] ?? ''
          return col.right ? cell.padStart(col.width) : cell.padEnd(col.width)
        })
        .join(' | ') +
      ' |'
    const sepRow =
      '| ' +
      cols
        .map((col) =>
          col.right ? '-'.repeat(col.width - 1) + ':' : '-'.repeat(col.width)
        )
        .join(' | ') +
      ' |'
    return [fmtRow(headers), sepRow, ...rows.map(fmtRow)].join('\n')
  }
  const totalTable = createMdTable(
    ['unit', 'count'],
    ['left', 'right'],
    [
      ['byte', fmt(total.byte)],
      ['line', fmt(total.line)],
      ['file', fmt(total.file)],
    ]
  )
  const byteTable = createMdTable(
    ['per', 'value'],
    ['left', 'right'],
    [
      ['line', fmt(avg.byte.per.line)],
      ['file', fmt(avg.byte.per.file)],
    ]
  )
  const lineTable = createMdTable(
    ['per', 'value'],
    ['left', 'right'],
    [['file', fmt(avg.line.per.file)]]
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

const entries: GraphEntry[] = readdirSync(DATA_DIR)
  .filter((f) => f.endsWith('.json'))
  .sort()
  .map((filename): GraphEntry => {
    const snap = JSON.parse(
      readFileSync(join(DATA_DIR, filename), 'utf-8')
    ) as Snapshot
    return {
      t: snapshotLabel(filename),
      files: snap.total.file,
      lines: snap.total.line,
      bytes: snap.total.byte,
      bpf: snap.byte.per.file,
      lpf: snap.line.per.file,
    }
  })
mkdirSync(GRAPH_DIR, { recursive: true })
writeFileSync(join(GRAPH_DIR, 'data.js'), generateGraphData(entries))
