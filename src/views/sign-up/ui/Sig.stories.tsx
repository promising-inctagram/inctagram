import SignUpPage from '@/views/sign-up'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SignUpPage> = {
  argTypes: {},
  component: SignUpPage,
  tags: ['autodocs'],
  title: 'components/SignUpPage',
}

export default meta
type Story = StoryObj<typeof SignUpPage>

export const DefaultStory: Story = {}
