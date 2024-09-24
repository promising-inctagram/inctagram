import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Header } from './Header'

const meta = {
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    countNotification: 3,
    isAuth: true,
    setLanguage: (value: string) => console.log(value),
  },
  render: () => {
    const [language, setLanguage] = useState<string>()
    const countNotification = 3

    return <Header countNotification={countNotification} isAuth setLanguage={setLanguage} />
  },
}

export const NotAutorealized: Story = {
  args: {
    isAuth: false,
    setLanguage: (value: string) => console.log(value),
  },
  render: () => {
    const [language, setLanguage] = useState<string>()

    return <Header isAuth={false} setLanguage={setLanguage} />
  },
}
