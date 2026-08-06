import type { UserInputHandlerOwner } from '../../owner/type.js'

export type RejectionPolicy = (param: {
  input: unknown
  owner: UserInputHandlerOwner
  message?: string
}) => void
