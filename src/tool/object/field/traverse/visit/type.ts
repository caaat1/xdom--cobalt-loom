import type { VisitResult } from './result/type.js'

export type ObjectFieldTraverseVisit = ({
  desc,
  key,
  readValue,
}: {
  desc: PropertyDescriptor | undefined
  key: string | symbol
  readValue: () => unknown
}) => VisitResult
