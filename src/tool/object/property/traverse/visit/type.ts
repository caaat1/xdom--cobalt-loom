import type { ObjectPropertyTraverseVisitResult } from './result/type.js'

export type ObjectPropertyTraverseVisit = ({
  desc,
  key,
  readValue,
}: {
  desc: PropertyDescriptor | undefined
  key: string | symbol
  readValue: () => unknown
}) => ObjectPropertyTraverseVisitResult
