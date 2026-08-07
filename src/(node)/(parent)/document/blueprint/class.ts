// import { NodeParentBlueprint } from "../../../parent/blueprint/class.js"
// import type { DocumentBundle } from "../bundle/type.js"

// export class DocumentBlueprint extends NodeParentBlueprint<
//   DocumentBundle[0],
//   DocumentBundle[1]
// > {
//   private static _childValidator: DocumentBundle[2]
//   @backAbstractField
//   override readonly childAllowed: DocumentBundle[2] =
//     (DocumentBlueprint._childValidator ??= new ChildValidator<
//       DocumentBundle[0][1]
//     >()
//       .registerChildAllowed(DocumentTypeBlueprint, undefined)
//       .registerChildAllowed(CommentBlueprint, undefined)
//       ._lf())
//   @backAbstractMethod override getRealizer({
//     docSource,
//     moleculePath,
//   }: {
//     docSource:
//       | {
//           doc: Document
//         }
//     moleculePath?: MoleculePath | undefined
//   }): DocumentRealizer<DocumentBundle[0], DocumentBundle[1]> {
//     return new DocumentRealizer<DocumentBundle[0], DocumentBundle[1]>({
//       docSource,
//       moleculePath,
//       nodeBlueprint: this,
//       param: undefined,
//     })
//   }
//   _test(): void {}
// }
