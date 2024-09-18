import { FormEvent, useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import clsx from 'clsx'

import s from './Recaptcha.module.scss'

type Props = {
  error: string
  onChange: (token: null | string) => void
}
export const Recaptcha = ({ error, onChange }: Props) => {
  const sitekey = '6LcO4kYqAAAAAMbu4Su-r90zP-vsqSaJVJc1usYC'

  return (
    <div className={clsx(error && s.rootError)}>
      <ReCAPTCHA onChange={onChange} sitekey={sitekey} theme={'dark'} />
      {error && <div className={s.error}>{error}</div>}
    </div>
  )
}
