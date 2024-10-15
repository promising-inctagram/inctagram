type ErrorResponseLogin = {
  data: {
    errorsMessage: string
  }
  status: number
}

type ErrorMessage = {
  field: keyof SignInFields
  message: string
}

type SignInFields = {
  password: string
}
export function fetchErrorMessageData(error: unknown): ErrorMessage[] | string {
  if (isApiError(error)) {
    const { data, status } = error

    if (status === 401) {
      return [{ field: 'password', message: data.errorsMessage }]
    }
  }

  return 'Unknown error'
}

function isApiError(error: unknown): error is ErrorResponseLogin {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    'status' in error &&
    typeof (error as ErrorResponseLogin).data === 'object'
  )
}
