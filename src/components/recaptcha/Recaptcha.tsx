import ReCAPTCHA from 'react-google-recaptcha'

import { Card } from '@/components/card'

import s from './Recaptcha.module.scss'

type Props = {}
export const Recaptcha = (props: Props) => {
  const sitekey = '6LcO4kYqAAAAAMbu4Su-r90zP-vsqSaJVJc1usYC'
  const onChange = () => {}

  return <ReCAPTCHA onChange={onChange} sitekey={sitekey} theme={'dark'} />
}
