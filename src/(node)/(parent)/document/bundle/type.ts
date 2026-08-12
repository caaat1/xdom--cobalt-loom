import type { CommentBundle } from '../../../(child)/(characterData)/comment/bundle/type.js'
import type { DocumentTypeBundle } from '../../../(child)/documentType/bundle/type.js'
import type { NodeBundle } from '../../../../node/bundle/alt/type.js'
import type { NodeParentBundle } from '../../../parent/bundle/type.js'
import type { DocumentBlueprint } from '../blueprint/class.js'

export type DocumentBundle = NodeBundle<Document, DocumentBlueprint>
export type DocumentParentBundle = NodeParentBundle<
  DocumentBundle,
  CommentBundle | DocumentTypeBundle
  // | [HTMLHtmlElement, ElementStandardNormalHtml]
>
