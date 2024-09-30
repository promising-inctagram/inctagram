import { Card } from '@/components/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    as: {
      control: { type: 'radio' },
      options: ['div', 'article', 'section'],
    },
  },
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <p>
        <div>Card</div>
      </p>
    ),
  },
}
