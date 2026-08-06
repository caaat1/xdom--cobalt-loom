export type Cb = ({
  desc,
  key,
  value,
}: {
  desc: PropertyDescriptor | undefined
  key: string | symbol
  value: unknown
}) => void
