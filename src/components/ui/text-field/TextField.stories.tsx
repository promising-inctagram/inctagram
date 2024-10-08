import { TextField } from '@/components/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    errorMessage: {
      control: {
        type: 'text',
      },
    },
    isRequired: {
      control: {
        type: 'boolean',
      },
    },
    placeholder: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['password', 'search', 'text'],
    },
  },
  component: TextField,
  tags: ['autodocs'],
  title: 'components/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof TextField>

export const Text: Story = {
  args: {
    label: 'Some text-field label',
    placeholder: 'type something...',
  },
}

export const TextWithError: Story = {
  args: {
    errorMessage: 'Some error occurred...',
    isRequired: true,
    label: 'Some text-field label',
    placeholder: 'type something...',
  },
}

export const Password: Story = {
  args: {
    label: 'Some text-field label',
    placeholder: 'type password...',
    variant: 'password',
  },
}

export const Search: Story = {
  args: {
    label: 'Some text-field label',
    placeholder: 'type to start searching...',
    variant: 'search',
  },
}
