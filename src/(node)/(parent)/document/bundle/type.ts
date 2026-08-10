import type { CommentBlueprint } from '../../../(child)/(characterData)/comment/blueprint/class.js'
import type { DocumentTypeBlueprint } from '../../../(child)/documentType/blueprint/class.js'
import type { NodeParentBundle } from '../../../parent/bundle/type.js'
import type { DocumentBlueprint } from '../blueprint/class.js'

export type DocumentBundle = NodeParentBundle<
  [Document, DocumentBlueprint],
  [Comment, CommentBlueprint] | [DocumentType, DocumentTypeBlueprint]
  // | [HTMLHtmlElement, ElementStandardNormalHtml]
>
