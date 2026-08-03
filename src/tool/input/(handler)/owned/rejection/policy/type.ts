export type RejectionPolicy = (param: {
  input: unknown
  owner: object | undefined
}) => void
