import type { Meta, StoryObj } from '@storybook/react'

import { BlankImage } from '@/components/ui/blankImage/BlankImage'

const meta = {
  component: BlankImage,
  tags: ['autodocs'],
  title: 'Components/BlankImage',
} satisfies Meta<typeof BlankImage>

export default meta
type Story = StoryObj<typeof meta>

export const Circle: Story = {
  args: {
    type: 'circle',
  },
}

export const Square: Story = {
  args: {
    type: 'square',
  },
}
