import { TextField } from '@/components/text-field/TextField'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  args: { disabled: false },
  component: TextField,
  tags: ['autodocs'],
  title: 'components/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof TextField>

export const Email: Story = {
  args: {
    label: 'Email',
    placeholder: 'Epam@epam.com',
    variant: 'text',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Password',
    variant: 'password',
  },
}

export const Search: Story = {
  args: {
    placeholder: 'Input search',
    variant: 'search',
  },
}

export const Error: Story = {
  args: {
    error: 'Error text',
    label: 'Email',
    placeholder: 'Epam@epam.com',
    variant: 'text',
  },
}
