import { FormEvent, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import { Recaptcha } from '@/components/recaptcha/Recaptcha'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Recaptcha,
  tags: ['autodocs'],
  title: 'components/Recaptcha',
} satisfies Meta<typeof Recaptcha>

export default meta
type Story = StoryObj<typeof Recaptcha>

export const Default: Story = {
  args: {
    children: (
      <ReCAPTCHA
        hl={'en'}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY as string}
        theme={'dark'}
      />
    ),
  },
}
export const Error: Story = {
  render: () => {
    const [token, setToken] = useState<null | string>(null)
    const [error, setError] = useState('')

    const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY as string

    const handleTokenChange = (token: null | string) => {
      setToken(token)
      setError('')
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (token) {
        // Отправка формы с токеном
        setError('')
      } else {
        setError('Please verify that you are not a robot')
      }
    }

    return (
      <form onSubmit={handleSubmit}>
        <button style={{ cursor: 'pointer', marginBottom: '20px' }} type={'submit'}>
          Нажми на меня до галочки
        </button>
        <Recaptcha error={error}>
          <ReCAPTCHA hl={'en'} onChange={handleTokenChange} sitekey={sitekey} theme={'dark'} />
        </Recaptcha>
      </form>
    )
  },
}
