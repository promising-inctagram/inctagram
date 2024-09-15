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

export const TabsDefault: Story = {
  args: {
    tabs: [
      { disabled: false, title: 'General information', value: 'tab1' },
      { disabled: false, title: 'Devices', value: 'tab2' },
      { disabled: false, title: 'Account Management', value: 'tab3' },
      { disabled: false, title: 'My payments', value: 'tab4' },
    ],
  },
}
export const Disabled: Story = {
  args: {
    tabs: [
      { disabled: true, title: 'General information', value: 'tab1' },
      { disabled: true, title: 'Devices', value: 'tab2' },
    ],
  },
}
