import { Tabs } from '@/components/tabs/Tabs'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'components/Tabs',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  args: {
    tabs: [
      { disabled: false, title: 'General information', value: 'tab1' },
      { disabled: false, title: 'Devices', value: 'tab2' },
    ],
  },
}
