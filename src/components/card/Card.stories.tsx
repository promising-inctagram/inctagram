import { Meta, StoryObj } from '@storybook/react'

import { Card } from './Card'

const meta = {
  argTypes: {
    variant: {
      options: ['dark', 'light'],
    },
  },
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: {
    as: 'div',
    children: (
      <p>
        <div>Light</div>
      </p>
    ),
    maxWidth: '300px',
    variant: 'light',
  },
}

export const Dark: Story = {
  args: {
    as: 'div',
    children: (
      <div>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>Dark</div>
          <span>X</span>
        </div>
      </div>
    ),
    maxWidth: '644px',
    variant: 'dark',
  },
}
