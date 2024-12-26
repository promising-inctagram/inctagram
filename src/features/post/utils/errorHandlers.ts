import { showToast } from '@/components/ui'
import { getErrorMessageData } from '@/shared/utils/get-error-message-data'

export const handleErrors = (error: unknown) => {
  const errors = getErrorMessageData(error)

  if (typeof errors === 'string') {
    showToast({ message: errors, variant: 'error' })
  } else {
    errors.forEach(el => {
      showToast({ message: el.message, variant: 'error' })
    })
  }
}
