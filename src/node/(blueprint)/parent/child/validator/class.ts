import type { _lf } from '../../../../../tool/_lf/interface.js'
import type { NodeBlueprintCtorWide } from '../../../../blueprint/ctor/wide/type.js'

import type { ValidatorCb } from './cb/type.js'

export class ChildValidator<
  T_NodeBlueprintParent,
  T_NodeBlueprintChildAllowedAccumulator = never,
> implements _lf {
  /**
   * T_NodeBlueprintChildAllowedAccumulator appears in both parameter
   * (contravariant) and return (covariant) positions, making it invariant:
   * the registered set must exactly match the declared union — no more, no
   * less. Trade-off: a subclass that extends the allowed set must also update
   * the static field's type annotation to match, or TS will error. To fall
   * back to a lower-bound-only check (superset registrations allowed), change
   * the return type back to `void`.
   */
  declare protected readonly _childAllowed: (
    _: T_NodeBlueprintChildAllowedAccumulator
  ) => T_NodeBlueprintChildAllowedAccumulator
  private readonly map = new Map<NodeBlueprintCtorWide<unknown>, unknown>()
  // connect<T_NodeBlueprintChild>({
  //   nodeBlueprintParent,
  //   nodeBuiltChild,
  // }: {
  //   nodeBlueprintParent: T_NodeBlueprintParent & {
  //     build(param: { doc: Document }): { node: Node }
  //   }
  //   nodeBuiltChild: {
  //     node: Node
  //     nodeBlueprint: T_NodeBlueprintChild
  //   }
  // }): this {
  //   if (
  //     this.validate({
  //       nodeBlueprintParent,
  //       nodeBlueprintChild: nodeBuiltChild.nodeBlueprint,
  //     })
  //   ) {
  //     const { node } = nodeBlueprintParent.build({
  //       doc: getDoc(nodeBuiltChild),
  //     })
  //     nodeBuiltChild.node.appendChild(node)
  //   } else {
  //     throw new Error('Invalid parent/child')
  //   }
  //   return this
  // }
  registerChildAllowed<T_NodeBlueprintChild>(
    childCtor: NodeBlueprintCtorWide<T_NodeBlueprintChild>,
    validator:
      ValidatorCb<T_NodeBlueprintParent, T_NodeBlueprintChild> | undefined
  ): ChildValidator<
    T_NodeBlueprintParent,
    T_NodeBlueprintChildAllowedAccumulator | T_NodeBlueprintChild
  > {
    this.map.set(childCtor, validator)
    // `ReturnType<typeof this.registerChildAllowed>` cannot be used here: the
    // invariant phantom (_childAllowed) causes TS to resolve the unbound
    // method-level T_NodeBlueprintChild to `unknown`, yielding
    // ChildValidator<P, Acc | unknown> = ChildValidator<P, unknown>, which
    // fails the invariant check against the declared return type.
    return this as unknown as ChildValidator<
      T_NodeBlueprintParent,
      T_NodeBlueprintChildAllowedAccumulator | T_NodeBlueprintChild
    >
  }
  validate<T_NodeBlueprintChild>({
    nodeBlueprintParent,
    nodeBlueprintChild,
  }: {
    nodeBlueprintParent: T_NodeBlueprintParent
    nodeBlueprintChild: T_NodeBlueprintChild
  }): boolean {
    const childCtor = (
      nodeBlueprintChild as {
        constructor: NodeBlueprintCtorWide<T_NodeBlueprintChild>
      }
    ).constructor
    const rawCb = this.map.get(childCtor)
    if (rawCb === undefined) {
      return true
    }
    const cb = rawCb as ValidatorCb<T_NodeBlueprintParent, T_NodeBlueprintChild>
    return cb({ nodeBlueprintParent, nodeBlueprintChild })
  }
  _lf(): this {
    return this
  }
}
// import type { ChildUnionBlueprintCtor } from '@/xDom/(node)/child/blueprint/ctor/type.js'
// import type { ChildUnionBlueprint } from '@/xDom/(node)/child/blueprint/type.js'
// import type { ChildUnion } from '@/xDom/(node)/child/type.js'
// import type { _lf } from '@/xDom/_/_lf/interface.js'
// import type { NodeBlueprint } from '@/xDom/node/blueprint/class.js'
// import type { NodeBlueprintCtor } from '@/xDom/node/blueprint/ctor/type.js'
// import { getDoc } from '@/xDom/node/getDoc/function.js'

// import type { ValidatorCb } from './cb/type.js'

// export class ChildValidator<
//   T_ParentUnionBlueprint,
//   T_ChildUnionBlueprintAllowedAccumulator = never,
// > implements _lf {
//   declare protected readonly _childAllowed: (
//     _: T_ChildUnionBlueprintAllowedAccumulator
//   ) => void
//   private readonly childValidatorMap = new Map<
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     ChildUnionBlueprintCtor<[ChildUnion, ChildUnionBlueprint<any>]>,
//     unknown
//   >()
//   connect<
//     T_ChildUnionBundle extends [ChildUnion, NodeBlueprint<T_ChildUnionBundle>],
//   >({
//     xDomParentUnion,
//     xDomChildUnionCreated,
//   }: {
//     xDomParentUnion: T_ParentUnionBlueprint & {
//       create(param: { doc: Document }): { node: Node }
//     }
//     xDomChildUnionCreated: {
//       node: Node
//       xDomNode: T_ChildUnionBundle[1]
//     }
//   }): this {
//     if (
//       this.validate({
//         xDomParentUnion,
//         xDomChildUnion: xDomChildUnionCreated.xDomNode,
//       })
//     ) {
//       const { node } = xDomParentUnion.create({
//         doc: getDoc(xDomChildUnionCreated),
//       })
//       xDomChildUnionCreated.node.appendChild(node)
//     } else {
//       throw new Error('Invalid parent/child')
//     }
//     return this
//   }
//   registerChildAllowed<
//     T_ChildUnionBundle extends [ChildUnion, NodeBlueprint<T_ChildUnionBundle>],
//   >(
//     childCtor: NodeBlueprintCtor<T_ChildUnionBundle>,
//     validator:
//       | ValidatorCb<T_ParentUnionBlueprint, T_ChildUnionBundle[1]>
//       | undefined
//   ): ChildValidator<
//     T_ParentUnionBlueprint,
//     T_ChildUnionBlueprintAllowedAccumulator | T_ChildUnionBundle[1]
//   > {
//     this.childValidatorMap.set(childCtor, validator)
//     return this as unknown as ReturnType<typeof this.registerChildAllowed>
//   }
//   validate<
//     T_ChildUnionBundle extends [ChildUnion, NodeBlueprint<T_ChildUnionBundle>],
//   >({
//     xDomParentUnion,
//     xDomChildUnion,
//   }: {
//     xDomParentUnion: T_ParentUnionBlueprint
//     xDomChildUnion: T_ChildUnionBundle[1]
//   }): boolean {
//     const childCtor =
//       xDomChildUnion.constructor as ChildUnionBlueprintCtor<T_ChildUnionBundle>
//     const rawCb = this.childValidatorMap.get(childCtor)
//     if (rawCb === undefined) {
//       return true
//     }
//     const cb = rawCb as ValidatorCb<T_ParentUnionBlueprint, T_ChildUnionBundle[1]>
//     return cb({ xDomParentUnion, xDomChildUnion })
//   }
//   _lf(): this {
//     return this
//   }
// }
