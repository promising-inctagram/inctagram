import { Badge } from '@/components/ui'
import { BellOutlineIcon } from '@/components/ui/icons'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    count: {
      control: { type: 'number' },
    },
    variant: {
      control: { type: 'radio' },
      options: ['dot', 'standard'],
    },
  },
  component: Badge,
  tags: ['autodocs'],
  title: 'Components/Badge',
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const BadgeOnBellIcon: Story = {
  args: {
    children: <BellOutlineIcon style={{ height: 24, width: 24 }} />,
    count: 10,
  },
}
