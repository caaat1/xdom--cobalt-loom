import type { TypeDescription } from '../../type/description/type.js'
import type { MoleculeBundle } from '../bundle/type.js'
import type { MoleculePath } from '../path/type.js'

type ActualType = string
export class MoleculeTypeError extends Error {
  constructor({
    expectedType,
    moleculeBundle,
  }: {
    expectedType?: TypeDescription
    moleculeBundle: MoleculeBundle<unknown, MoleculePath>
  }) {
    const { molecule, moleculePath } = moleculeBundle
    const actualType: ActualType =
      typeof molecule === 'object'
        ? molecule === null
          ? 'null'
          : Array.isArray(molecule)
            ? 'array'
            : molecule.constructor.name
        : typeof molecule
    super(
      `Invalid molecule type at path ${moleculePath.join('.')}: ` +
        `expected ${expectedType}, but got some ${actualType}`
    )
    this.name = this.constructor.name
  }
}
