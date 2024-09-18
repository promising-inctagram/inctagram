import { Recaptcha } from '@/components/recaptcha/Recaptcha'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  args: { disabled: false },
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
