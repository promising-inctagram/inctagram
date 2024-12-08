import { ReactNode } from 'react'

import { Translate } from '@/components'
import { Typography } from '@/components/ui'
import { Paths } from '@/shared/enums'
import { isAgeValid } from '@/views/settings/model/is-age-valid'
import Link from 'next/link'
import { useRouter } from 'next/router'

type AgeValidationHandlerProps = {
  dateOfBirth: Date | null
  onSaveFormData: () => void
  validationMessages: {
    ageValidationMessage: string
    linkPolicy: string
  }
}

export const AgeError = ({
  dateOfBirth,
  onSaveFormData,
  validationMessages,
}: AgeValidationHandlerProps): ReactNode | null => {
  const router = useRouter()

  const redirectBackUrl = `${Paths.privacyPolicy}?redirectTo=${encodeURIComponent(router.asPath)}`

  if (!isAgeValid(dateOfBirth)) {
    return (
      <Translate
        tags={{
          1: () => (
            <Typography
              as={Link}
              href={redirectBackUrl}
              onClick={onSaveFormData}
              variant={'small_link'}
            >
              {validationMessages.linkPolicy}
            </Typography>
          ),
        }}
        text={validationMessages.ageValidationMessage}
      />
    )
  }

  return null
}
