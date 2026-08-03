// export class IntermediateService{
//   canSetSafely(
//     value: unknown
//   ): value is NonNullable<typeof this.input> {
//     return isTraversable(value)
//   }
//   protected override setSafely(input: NonNullable<typeof this.input>): void {
//     super.setSafely(input)
//     setSafelyIntermediate(this, input, InputHandlerOwned)
//   }
// }
