import { Meta, StoryObj } from '@storybook/react'

import { Card } from './Card'

const meta = {
  argTypes: {},
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    as: 'div',
    children: (
      <p>
        <div>Card</div>
      </p>
    ),
  },
}
