import ReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha'

import clsx from 'clsx'

import s from './Recaptcha.module.scss'

type Props = {
  error: string
  onChange: (token: null | string) => void
} & ReCAPTCHAProps

export const Recaptcha = ({ className, error, hl, onChange, sitekey, theme }: Props) => {
  return (
    <div className={clsx(error && s.rootError, className)}>
      <ReCAPTCHA hl={hl} onChange={onChange} sitekey={sitekey} theme={theme} />
      {error && <div className={s.error}>{error}</div>}
    </div>
  )
}
