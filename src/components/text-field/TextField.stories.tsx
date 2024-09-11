import { TextField } from '@/components/text-field/TextField'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TextField> = {
  args: { disabled: false },
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'components/TextField',
}

export default meta
type Story = StoryObj<typeof TextField>

export const DefaultEmail: Story = {
  args: {
    label: 'Email',
    placeholder: 'Epam@epam.com',
    type: 'text',
  },
}

export const DefaultPassword: Story = {
  args: {
    label: 'Password',
    type: 'password',
  },
}

export const DefaultSearch: Story = {
  args: {
    placeholder: 'Input search',
    type: 'search',
  },
}

export const ErrorSearch: Story = {
  args: {
    error: 'Error text',
    placeholder: 'Input search',
    type: 'search',
    value: 'Some value',
  },
}
export const Error: Story = {
  args: {
    error: 'Error text',
    label: 'Email',
    placeholder: 'Epam@epam.com',
    type: 'text',
    value: 'Some value',
  },
}
