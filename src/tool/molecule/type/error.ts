import type { TypeDescription } from '../../type/description/type.js'
import type { MoleculeBundle } from '../bundle/type.js'
import type { MoleculePath } from '../path/type.js'

export class MoleculeTypeError extends Error {
  constructor({
    typeExpected,
    moleculeBundle,
  }: {
    typeExpected?: TypeDescription
    moleculeBundle: MoleculeBundle<unknown, MoleculePath>
  }) {
    const { molecule, moleculePath } = moleculeBundle
    const typeActual: string =
      typeof molecule === 'object'
        ? molecule === null
          ? 'null'
          : Array.isArray(molecule)
            ? 'array'
            : molecule.constructor.name
        : typeof molecule
    super(
      `Invalid molecule type at path ${moleculePath.join('.')}: ` +
        `expected ${typeExpected}, but got some ${typeActual}`
    )
    this.name = this.constructor.name
  }
}
