import { TextField } from '@/components/text-field/TextField'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  args: { disabled: false },
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'components/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof TextField>

export const Email: { args: { label: string; placeholder: string; type: string } } = {
  args: {
    label: 'Email',
    placeholder: 'Epam@epam.com',
    type: 'email',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Password',
    variant: 'password',
  },
}

//
// export const Search: Story = {
//   args: {
//     placeholder: 'Input search',
//     type: 'search',
//   },
// }
//
// export const Error: Story = {
//   args: {
//     error: 'Error text',
//     label: 'Email',
//     placeholder: 'Epam@epam.com',
//     type: 'text',
//   },
// }
