export type DocumentTypeParamMapPartial = {
  /** The qualified name of the document type. Defaults to `'html'`. */
  qualifiedName?: string | undefined
  /** The public identifier. Defaults to `''` (HTML5 has no public identifier). */
  publicId?: string | undefined
  /** The system identifier. Defaults to `''` (HTML5 has no system identifier). */
  systemId?: string | undefined
}
