import RecaptchaComponent from 'react-google-recaptcha'

import { Recaptcha } from '@/components'
// import { useRouter } from 'next/router'

interface ForgotRecaptchaProps {
  error: string
  setError: (error: string) => void
  setToken: (token: null | string) => void
}

export const ForgotRecaptcha = ({ error, setError, setToken }: ForgotRecaptchaProps) => {
  //   const { locale } = useRouter()
  const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY as string

  const handleTokenChange = (token: null | string) => {
    setToken(token)
    setError('')
  }

  return (
    <Recaptcha error={error}>
      <RecaptchaComponent hl={'en'} onChange={handleTokenChange} sitekey={sitekey} theme={'dark'} />
    </Recaptcha>
  )
}
