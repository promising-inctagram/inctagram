import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './select'

const meta = {
  argTypes: {},
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Select-box',
    placeHolder: 'choose options...',
    value: '',
  },
}
export const WithDefaultValue: Story = {
  args: {
    label: 'Select-box',
    placeHolder: 'choose options...',
    value: 'apple',
  },
}
export const Disabled: Story = {
  args: {
    disabled: true,
    value: '',
  },
}
