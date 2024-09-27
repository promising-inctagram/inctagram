import { SignInForm } from '@/components/forms/sign-in/SignInForm'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SignInForm> = {
  argTypes: {},
  component: SignInForm,
  tags: ['autodocs'],
  title: 'components/SignInForm',
}

export default meta
type Story = StoryObj<typeof SignInForm>

export const DefaultStory: Story = {
  name: 'SignInForm',
}
