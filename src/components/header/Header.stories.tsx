import { Header } from '@/components'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    countNotification: {
      control: {
        type: 'number',
      },
    },
    isAuth: {
      control: {
        type: 'boolean',
      },
    },
  },
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultStory: Story = {
  name: 'Header',
}
