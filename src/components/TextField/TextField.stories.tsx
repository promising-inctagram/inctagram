import { TextField } from '@/components/TextField/TextField'
import { EyeOutlineIcon, SearchOutlineIcon } from '@/components/icons'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TextField> = {
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'components/TextField',
  args: { disabled: false },
}

export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    disabled: false,
    labelTitle: 'Email',
    placeholder: 'Epam@epam.com',
  },
}

export const DefaultWithIconEnd: Story = {
  args: {
    iconEnd: <EyeOutlineIcon />,
    labelTitle: 'Email',
    placeholder: 'Epam@epam.com',
  },
}

export const DefaultWithIconStart: Story = {
  args: {
    iconStart: <SearchOutlineIcon />,
    placeholder: 'Input search',
  },
}

export const ErrorWithIconStart: Story = {
  args: {
    error: 'Error text',
    iconStart: <SearchOutlineIcon />,
    placeholder: 'Input search',
    value: 'Some value',
  },
}
export const Error: Story = {
  args: {
    error: 'Error text',
    labelTitle: 'Email',
    placeholder: 'Epam@epam.com',
    value: 'Some value',
  },
}
