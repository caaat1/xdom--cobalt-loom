import type { DocumentTypeBlueprint } from '../../../(child)/documentType/blueprint/class.js'
import { NodeParentBuilt } from '../../../parent/built/class.js'
import type { DocumentBlueprint } from '../blueprint/class.js'

export class DocumentBuilt extends NodeParentBuilt<
  [Document, DocumentBlueprint],
  [DocumentType, DocumentTypeBlueprint]
> {}
