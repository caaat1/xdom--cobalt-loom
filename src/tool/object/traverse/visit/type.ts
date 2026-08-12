import type { TraverseObjectVisitResult } from './result/type.js'

export type TraverseObjectVisit = ({
  desc,
  key,
  readValue,
}: {
  desc: PropertyDescriptor | undefined
  key: string | symbol
  readValue: () => unknown
}) => TraverseObjectVisitResult
