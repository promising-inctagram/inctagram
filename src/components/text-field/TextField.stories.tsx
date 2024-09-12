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

export const Email: Story = {
  args: {
    label: 'Email',
    placeholder: 'Epam@epam.com',
    type: 'text',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Password',
    type: 'password',
  },
}

export const Search: Story = {
  args: {
    placeholder: 'Input search',
    type: 'search',
  },
}

export const ErrorEmail: Story = {
  args: {
    error: 'Error text',
    label: 'Email',
    placeholder: 'Epam@epam.com',
    type: 'text',
  },
}
export const Error: Story = {
  args: {
    error: 'Error text',
    label: 'Email',
    placeholder: 'Epam@epam.com',
    type: 'text',
  },
}
