import { NodeParentBuilt } from '../../../parent/built/class.js'
import type { DocumentBundle } from '../bundle/type.js'

export class DocumentBuilt extends NodeParentBuilt<
  DocumentBundle['parent'],
  DocumentBundle['child']
> {}
