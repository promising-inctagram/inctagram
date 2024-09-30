import SignInPage from '@/views/sign-in'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SignInPage> = {
  argTypes: {},
  component: SignInPage,
  tags: ['autodocs'],
  title: 'components/SignInPage',
}

export default meta
type Story = StoryObj<typeof SignInPage>

export const DefaultStory: Story = {}
