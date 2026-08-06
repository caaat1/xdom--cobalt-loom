import type { AtomBundle } from '../../../../(molecule)/atom/bundle/type.js'

export type HandleMethodParam<T_Atom, T_StaticData> = AtomBundle<T_Atom> & {
  staticData: T_StaticData
}
