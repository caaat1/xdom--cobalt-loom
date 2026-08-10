import type { CommentBundle } from '../../../(child)/(characterData)/comment/bundle/type.js'
import type { DocumentTypeBundle } from '../../../(child)/documentType/bundle/type.js'
import { NodeParentBuilt } from '../../../parent/built/class.js'
import type { DocumentBundle } from '../bundle/type.js'

export class DocumentBuilt extends NodeParentBuilt<
  DocumentBundle,
  CommentBundle | DocumentTypeBundle
> {}
