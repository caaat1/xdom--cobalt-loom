export class NodeWrapper {
  readonly #node: Node
  constructor(node: Node) {
    this.#node = node
  }
  get nodeName(): string {
    return this.#node.nodeName
  }
  get textContent(): string | null {
    return this.#node.textContent
  }
}
