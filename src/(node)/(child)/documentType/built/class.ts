import { NodeBuilt } from '../../../../node/built/class.js'
import type { NodeChildBuilt } from '../../../child/built/type.js'
import type { DocumentTypeBundle } from '../bundle/type.js'

export class DocumentTypeBuilt
  extends NodeBuilt<DocumentTypeBundle>
  implements NodeChildBuilt<DocumentTypeBundle> {}
