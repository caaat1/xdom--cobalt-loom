/**
 * Corrective augmentations to TypeScript's DOM type library.
 *
 * TypeScript's `lib.dom.d.ts` defines `Comment` as an empty extension of
 * `CharacterData` (`interface Comment extends CharacterData {}`), which makes
 * every `CharacterData` subtype — including `Text` — accidentally structurally
 * assignable to `Comment`. This breaks the framework's allowed-kin constraint
 * checking, where removing `| Text` from an allowed-children union would
 * silently pass instead of raising a type error.
 *
 * `Comment` and `Text` each receive a `_xDomKind_` string-literal discriminant
 * that makes them structurally distinct. This is a type-only correction:
 * the property is never present on actual DOM objects at runtime.
 *
 * `CDATASection` and `ProcessingInstruction` are XML-only node types with no
 * presence in the HTML DOM and are intentionally excluded from this framework.
 *
 * ### Opt out
 * Augment `XDomConfig` from any `.d.ts` file in your project:
 * ```ts
 * interface XDomConfig { disableDomDiscriminants: true }
 * ```
 * When opted out, `_xDomKind_` widens to `string` on all types, restoring the
 * original structural compatibility.
 */
export {}
declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- intentionally empty; designed for user declaration merging (opt-out flag)
  interface XDomConfig {}
  interface Comment {
    readonly _xDomKind_: 'disableDomDiscriminants' extends keyof XDomConfig
      ? string
      : 'Comment'
  }
  interface Text {
    readonly _xDomKind_: 'disableDomDiscriminants' extends keyof XDomConfig
      ? string
      : 'Text'
  }
}
