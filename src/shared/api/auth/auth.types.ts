export type CreateUserArgs = {
  agreement: boolean
  email: string
  password: string
  username: string
}

export type ConfirmEmailArgs = {
  code: string
}
