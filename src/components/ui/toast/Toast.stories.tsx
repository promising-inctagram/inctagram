import { EyeIcon } from '@/components/ui/icons'
import { Meta, StoryObj } from '@storybook/react'

import { Toaster, showToast } from './Toast'

const meta: Meta<typeof Toaster> = {
  component: Toaster,
  tags: ['autodocs'],
  title: 'Components/Toast',
}

export default meta

type Story = StoryObj<typeof meta>

const style = {
  alignItems: 'center',
  display: 'flex',
  fontSize: '100px',
  height: '100vh',
  justifyContent: 'center',
}

export const Success: Story = {
  render: () => {
    const onClickHandler = () => {
      showToast({
        message: 'Your settings are saved',
      })
    }

    return (
      <div style={style}>
        <div onClick={onClickHandler}>Показать тост</div>
        <Toaster />
      </div>
    )
  },
}

export const Error: Story = {
  render: () => {
    const onClickHandler = () => {
      showToast({
        message: 'Error! Server is not available',
        variant: 'error',
      })
    }

    return (
      <div style={style}>
        <div onClick={onClickHandler}>Показать тост</div>
        <Toaster />
      </div>
    )
  },
}

export const Warning: Story = {
  render: () => {
    const onClickHandler = () => {
      showToast({
        message: 'Warning!!!',
        variant: 'warning',
      })
    }

    return (
      <div style={style}>
        <div onClick={onClickHandler}>Показать тост</div>
        <Toaster />
      </div>
    )
  },
}

export const Info: Story = {
  render: () => {
    const onClickHandler = () => {
      showToast({
        message: 'Some information!!!',
        variant: 'info',
      })
    }

    return (
      <div style={style}>
        <div onClick={onClickHandler}>Показать тост</div>
        <Toaster />
      </div>
    )
  },
}

export const SuccessProgressBar: Story = {
  render: () => {
    const onClickHandler = () => {
      showToast({
        duration: 15000,
        message: 'Some information!!!',
        progress: true,
      })
    }

    return (
      <div style={style}>
        <div onClick={onClickHandler}>Показать тост</div>
        <Toaster />
      </div>
    )
  },
}

export const DifferentIcon: Story = {
  render: () => {
    const onClickHandler = () => {
      showToast({
        icon: <EyeIcon />,
        message: 'Some information!!!',
      })
    }

    return (
      <div style={style}>
        <div onClick={onClickHandler}>Показать тост</div>
        <Toaster />
      </div>
    )
  },
}

export const LongText: Story = {
  render: () => {
    const onClickHandler = () => {
      showToast({
        message: 'Some informationsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
      })
    }

    return (
      <div style={style}>
        <div onClick={onClickHandler}>Показать тост</div>
        <Toaster />
      </div>
    )
  },
}
