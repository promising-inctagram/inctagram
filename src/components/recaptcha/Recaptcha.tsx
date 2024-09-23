import { ReCAPTCHAProps } from 'react-google-recaptcha'

import clsx from 'clsx'

import s from './Recaptcha.module.scss'

type Props = {
  error: string
} & Omit<ReCAPTCHAProps, 'sitekey'>

export const Recaptcha = ({ children, className, error }: Props) => {
  return (
    <div className={clsx(error && s.rootError, className)}>
      {children}
      {error && <div className={s.error}>{error}</div>}
    </div>
  )
}
