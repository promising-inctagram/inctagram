import { useEffect, useState } from 'react'

import { getLayout } from '@/components'
import { useCheckRecoveryCodeMutation } from '@/shared/api/auth/auth.api'
import { useRouter } from 'next/router'

import { CreateNewPassword } from './CreateNewPassword'
import LinkExpired from './LinkExpired'

function CreateNewPasswordPage() {
  const [recoveryCode, setRecoveryCode] = useState('')
  const [isLinkExpired, setIsLinkExpired] = useState<boolean>(false)
  const [checkRecoveryCode] = useCheckRecoveryCodeMutation()
  const router = useRouter()

  useEffect(() => {
    const code = router.query.recoveryCode

    if (code) {
      setRecoveryCode(Array.isArray(code) ? code[0] : code)
    }
  }, [router.query])

  useEffect(() => {
    if (recoveryCode) {
      checkRecoveryCode({ recoveryCode })
        .unwrap()
        .catch(e => setIsLinkExpired(true))
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recoveryCode])

  return isLinkExpired ? (
    <LinkExpired />
  ) : (
    <CreateNewPassword recoveryCode={recoveryCode} setIsLinkExpired={setIsLinkExpired} />
  )
}

CreateNewPasswordPage.getLayout = getLayout
export default CreateNewPasswordPage
