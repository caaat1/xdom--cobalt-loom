export function getDocument({ node }: { node: Node }): Document {
  return node.ownerDocument ?? (node as Document)
}
