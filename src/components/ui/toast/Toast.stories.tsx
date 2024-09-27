import { Button } from '@/components/ui'
import { Meta, StoryObj } from '@storybook/react'

import { Toaster, showToast } from './Toast'

const meta: Meta<typeof Toaster> = {
  component: Toaster,
  tags: ['autodocs'],
  title: 'Components/Toast',
}

export default meta

type Story = StoryObj<typeof meta>

export const BaseStory: Story = {
  name: 'Toast',
  render: () => {
    const successHandler = () => {
      showToast({
        message: 'Sucess!',
      })
    }

    const warningHandler = () => {
      showToast({
        message: 'Warning!',
        variant: 'warning',
      })
    }

    const errorHandler = () => {
      showToast({
        message: 'Error! Server is not available',
        variant: 'error',
      })
    }

    const infoHandler = () => {
      showToast({
        message: 'Info!',
        variant: 'info',
      })
    }

    return (
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button onClick={successHandler}>Success</Button>
        <Button onClick={warningHandler}>Warning</Button>
        <Button onClick={errorHandler}>Error</Button>
        <Button onClick={infoHandler}>Info</Button>
        <Toaster />
      </div>
    )
  },
}
