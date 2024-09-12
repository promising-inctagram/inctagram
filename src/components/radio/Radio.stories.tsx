import type { Meta, StoryObj } from '@storybook/react'

import { Option } from '@/components/radio/Radio'

import { Card } from '../card'
import { Radio } from './Radio'

const mockRadio: Option[] = [
  { id: '1', label: 'RadioGroup', value: '1' },
  { id: '2', label: 'RadioGroup', value: '2' },
  { id: '3', label: 'RadioGroup', value: '3' },
  { id: '4', label: 'RadioGroup', value: '4' },
]

const meta = {
  argTypes: {
    disabled: { control: 'boolean' },
  },
  component: Radio,
  tags: ['autodocs'],
  title: 'Primitives/RadioGroup',
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const RadioGroup: Story = {
  args: {
    options: mockRadio,
    value: '2',
  },
  render: args => (
    <Card>
      <Radio {...args} />
    </Card>
  ),
}

export const RadioGroupDisabled: Story = {
  args: {
    disabled: true,
    options: mockRadio,
    value: '3',
  },
  render: args => (
    <Card>
      <Radio {...args} />
    </Card>
  ),
}
