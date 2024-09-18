import { FormEvent, useEffect, useState } from 'react'

import { Recaptcha } from '@/components/recaptcha/Recaptcha'
import { Meta, StoryObj } from '@storybook/react'
import clsx from 'clsx'

import s from '@/components/recaptcha/Recaptcha.module.scss'

const meta = {
  component: Recaptcha,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'components/Recaptcha',
} satisfies Meta<typeof Recaptcha>

export default meta
type Story = StoryObj<typeof Recaptcha>

export const Default: Story = {}
export const Error: Story = {
  render: () => {
    const [token, setToken] = useState<null | string>(null)
    const [error, setError] = useState('')

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
        <Recaptcha error={error} onChange={handleTokenChange} />
      </form>
    )
  },
}
