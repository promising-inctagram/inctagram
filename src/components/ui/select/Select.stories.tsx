import type { Meta, StoryObj } from '@storybook/react'

import { OptionsValue, Select } from '@/components/ui/select/Select'

import { FlagRussiaIcon, FlagUnitedKingdomIcon } from '../icons/flags'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const selectItems: OptionsValue[] = [{ value: 'apple' }, { value: 'banana' }, { value: 'orange' }]
const selectItemsWithIcons: OptionsValue[] = [
  { icon: <FlagRussiaIcon />, value: 'Russia' },
  { icon: <FlagUnitedKingdomIcon />, value: 'English' },
]

export const Default: Story = {
  args: {
    label: 'Select-box',
    options: selectItems,
    placeHolder: 'choose options...',
  },
}
export const WithDefaultValue: Story = {
  args: {
    defaultValue: selectItems[0].value,
    label: 'Select-box',
    options: selectItems,
    placeHolder: 'choose options...',
  },
}
export const WithIcons: Story = {
  args: {
    defaultValue: selectItemsWithIcons[0].value,
    label: 'Select-box',
    options: selectItemsWithIcons,
  },
}
export const Disabled: Story = {
  args: {
    disabled: true,
    options: selectItems,
    placeHolder: 'choose options...',
    value: '',
  },
}
