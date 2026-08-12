// import { NodeBlueprint } from '@/xDom/node/blueprint/class.js'
// import { MoleculeTraverser } from '@/xDom/tools/molecule/traverser/class.js'
// import type { HandleMethodParam } from '@/xDom/tools/molecule/traverser/handle/param/type.js'
// import {
//   stringifiableSamples,
//   type Stringifiable,
// } from '@/xDom/tools/stringifiable/type.js'

// import { isChildAtom } from '../../atom/is/function.js'
// import { type ChildAtom } from '../../atom/type.js'

// import type { StaticData } from './staticData/type.js'

// export const childMoleculeTraverser: MoleculeTraverser<
//   ChildAtom,
//   Stringifiable,
//   StaticData
// > = new MoleculeTraverser({
//   typeExpected: NodeBlueprint.name,
//   typeGuard: {
//     isAtom: isChildAtom,
//     isShorthand: (molecule: unknown): molecule is Stringifiable =>
//       Object.keys(stringifiableSamples).some(
//         (key): boolean => typeof molecule === key
//       ),
//   },
//   castToAtom: (shorthand: Stringifiable): ChildAtom =>
//     new XDomCharacterDataText({
//       _data_: String(shorthand),
//     }),
//   handle: (param: HandleMethodParam<ChildAtom, StaticData>): void => {
//     const {
//       atom: xDomNode,
//       moleculePath,
//       staticData: { parentMaterialized },
//     } = param
//     xDomNode.materialize({
//       on: { parentMaterialized },
//       moleculePath: [...parentMaterialized.moleculePath, ...moleculePath],
//     })
//   },
// })
// class XDomCharacterDataText {
//   constructor({ _data_ }: { _data_: string }) {
//     void _data_
//   }
// }
