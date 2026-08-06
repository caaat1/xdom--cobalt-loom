export type DocumentTypeParam = {
  /** The qualified name of the document type. Defaults to `'html'`. */
  qualifiedName: string
  /** The public identifier. Defaults to `''` (HTML5 has no public identifier). */
  publicId: string
  /** The system identifier. Defaults to `''` (HTML5 has no system identifier). */
  systemId: string
}
