import {
  SignUpConfirmedIllustration,
  SignUpIllustration,
  TimeManagementIllustration,
} from '@/components/illustrations/index'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  title: 'Design System/Illustrations',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const SignUpConfirmed: Story = {
  render: () => <SignUpConfirmedIllustration />,
}

export const SignUp: Story = {
  render: () => <SignUpIllustration />,
}

export const TimeManagement: Story = {
  render: () => <TimeManagementIllustration />,
}
