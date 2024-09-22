import { SideBar } from '@/components/sidebar/SideBar'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SideBar> = {
  argTypes: {},
  component: SideBar,
  tags: ['autodocs'],
  title: 'components/SideBar',
}

export default meta
type Story = StoryObj<typeof SideBar>

export const DefaultStory: Story = {
  name: 'SideBar',
}
