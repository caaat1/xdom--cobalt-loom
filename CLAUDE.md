# xDom

A TypeScript library of DOM node wrappers.

## Commands

- `npm run build` — emit `dist/index.js` + `dist/index.d.ts` via `tsc`
- `npm run test` — run the unit suite: `test:unit` (Node's native `node --test` against flat files in `test/unit/*.test.ts`) then `test:unit:decorators` (`tsx --test` against `test/unit/decorator/**/*.test.ts`) — Node's native TypeScript stripping only erases types, it cannot parse decorator syntax at all (confirmed: hard `SyntaxError`, not a semantics gap), so any spec exercising `src/tool/(decorator)` must live under `test/unit/decorator/` and run through `tsx` instead
- `npm run validate` — type-check + lint + format check + test; must pass before push
- `npm run lint:src:fix` — lint with autofix over `./src`

## Architecture

- `src/` — the library's public surface; typed strictly against `lib.dom.d.ts` interfaces (`Node`, `Element`, `Document`, ...), never a concrete DOM implementation's own classes. This is what makes xDom implementation-agnostic (jsdom, happy-dom, a real browser, ...) for free, via structural typing — no adapter/compatibility layer exists or is planned unless a real behavioral divergence between implementations is actually hit.
- `test/` — unit tests instantiate real DOM nodes via `jsdom` (a devDependency only, never imported from `src/`) to exercise the wrappers against a real implementation.
- Entry point is `src/index.ts` (not `_index.ts` — that house convention marks a _runnable_ entry; a library's entry is imported, not executed).
- `rootDir` is scoped to `./src` (not `./` like the backend profile) — there's no sibling `shared/` include root here, so the build emits a flat `dist/index.js` rather than `dist/src/index.js`.

## Conventions

- Type names use a `T_` prefix (`T_Name`, not `TName`) — the underscore makes `T` a separate word boundary.
- Files and directories starting with `-` are temporary: git-ignored and excluded from tsconfig.
- `package-lock.json` is intentionally not committed.
- Keep JSON keys and config lists in ASCII order (`&` < `*` < `-` < `.` < digits < uppercase < lowercase) unless order is load-bearing.
- `verbatimModuleSyntax` is on — use `import type` for type-only imports.
- `moduleDetection: "force"` — every file is a module; global augmentations must use `declare global {}`.
- Root `tsconfig.json` sets `"types": []` — `src/` never picks up ambient Node globals. `test/tsconfig.json` re-adds `"node"` for `node:test`/`node:assert`.
- A cross-file reference inside a JSDoc comment uses `@see {@link relative/path.js}`, never a bare backticked path in prose — plain comment text isn't part of the module graph, so no tooling (VS Code's "update imports on file move", `tsc`, refactors) keeps it in sync on rename; `@see {@link ...}` is at least greppable and gets TS's best-effort hover/navigation resolution.
