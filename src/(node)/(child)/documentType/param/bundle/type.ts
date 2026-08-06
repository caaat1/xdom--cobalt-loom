import type { NodeParamBundle } from '../../../../../node/param/bundle/type.js'
import type { DocumentTypeParam } from '../type.js'

export type DocumentTypeParamBundle = NodeParamBundle<
  DocumentTypeParam,
  'qualifiedName' | 'publicId' | 'systemId'
>
