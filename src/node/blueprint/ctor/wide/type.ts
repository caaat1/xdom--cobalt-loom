import type { CtorArgs } from '@/tool/ctor/args/type.js'

// TODO: try to improve it!
export type NodeBlueprintCtorWide<T_NodeBlueprint> = abstract new (
  ...args: CtorArgs
) => T_NodeBlueprint
