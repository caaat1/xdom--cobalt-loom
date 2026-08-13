import type { CommentBundle } from '../../../(child)/(characterData)/comment/bundle/type.js'
import type { DocumentTypeBundle } from '../../../(child)/documentType/bundle/type.js'
import type { NodeBundle } from '../../../../node/bundle/alt/type.js'
import type { DocumentBlueprint } from '../blueprint/class.js'

export type DocumentBundle = NodeBundle<Document, DocumentBlueprint>
export type DocumentParentBundle = {
  parent: DocumentBundle
  child: CommentBundle | DocumentTypeBundle
  // | [HTMLHtmlElement, ElementStandardNormalHtml]
}
// export type DocumentParentBundle<
//   T_NodeParent extends NodeParent,
//   T_NodeParentBlueprint extends NodeParentBlueprint<
//     NodeBundle<T_NodeParent, T_NodeParentBlueprint>,
//     T_NodeChildBundle
//   >,
//   T_NodeChildBundle extends NodeChildBundle<T_NodeChildBundle>,
// > = {}
