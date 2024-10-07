import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export type FormErrorData = { field: string; message: string }

export type ServerErrorData = {
  errorsMessages: FormErrorData[]
  path: string
  timestamp: string
}

export type CustomerError = {
  data: ServerErrorData
  status: number
}

export function getErrorMessageData(error: unknown) {
  if (isFetchBaseQueryError(error)) {
    if ('data' in error) {
      const errorData = error as CustomerError

      if ('errorsMessages' in errorData.data) {
        return errorData.data.errorsMessages
      }
    }
  } else if (isErrorWithMessage(error)) {
    return error.message
  }

  // any other errors
  return JSON.stringify(error)
}

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}
