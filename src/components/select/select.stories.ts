import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './select'
import { OptionsValue } from './select'
import {FlagRussiaIcon} from "@/components/icons/flags";

const meta = {
  argTypes: {},
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const mockOptions: OptionsValue[] = [
  { title: 'Select-box1', value: 'apple' },
  { title: 'Select-box2', value: 'banana' },
  { title: 'Select-box3', value: 'English',image:<FlagRussiaIcon/> },
]

export const Default: Story = {
  args: {
    label: 'Select-box',
    options: mockOptions,
    placeHolder: 'choose options...',
  },
}
export const WithDefaultValue: Story = {
  args: {
    label: 'Select-box',
    options: mockOptions,
    placeHolder: 'choose options...',
    defaultValue:'apple'
  },
}
export const Disabled: Story = {
  args: {
    disabled: true,
    options: mockOptions,
    placeHolder: 'choose options...',
    value: '',
  },
}
