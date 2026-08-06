import { NodeBuilt } from '../../../../node/built/class.js'
import type { ChildBuilt } from '../../../child/built/type.js'
import type { DocumentTypeBundle } from '../bundle/type.js'

export class DocumentTypeBuilt
  extends NodeBuilt<DocumentTypeBundle>
  implements ChildBuilt<DocumentTypeBundle> {}
