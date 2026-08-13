import type { CommentBundle } from '../../../(child)/(characterData)/comment/bundle/type.js'
import type { DocumentTypeBundle } from '../../../(child)/documentType/bundle/type.js'
import type { NodeBundle } from '../../../../node/bundle/alt/type.js'
import type { NodeChildBundle } from '../../../child/bundle/type.js'
import type { NodeParentBlueprint } from '../../../parent/blueprint/class.js'
import type { NodeParent } from '../../../parent/type.js'
import type { DocumentBlueprint } from '../blueprint/class.js'

// export type DocumentBundle = NodeBundle<Document, DocumentBlueprint>
// export type DocumentParentBundle = {
//   parent: DocumentBundle
//   child: CommentBundle | DocumentTypeBundle
//   // | [HTMLHtmlElement, ElementStandardNormalHtml]
// }

export type ParentBundle<
  T_NodeParentBundle extends NodeBundle<
    NodeParent,
    NodeParentBlueprint<T_NodeParentBundle, T_NodeChildBundle>
  >,
  T_NodeChildBundle extends NodeChildBundle<T_NodeChildBundle>,
> = {
  parent: T_NodeParentBundle
  child: T_NodeChildBundle
}
export type DocumentBundle = ParentBundle<
  { node: Document; nodeBlueprint: DocumentBlueprint },
  CommentBundle | DocumentTypeBundle
>
