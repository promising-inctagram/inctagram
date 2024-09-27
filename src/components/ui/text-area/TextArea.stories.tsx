import { TextArea } from '@/components/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: TextArea,
  tags: ['autodocs'],
  title: 'Components/Textarea',
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const TextAreaDefault: Story = {
  args: {
    disabled: false,
    label: 'Some label',
    placeholder: 'Text Area',
  },
}
export const TextAreaDisabled: Story = {
  args: {
    disabled: true,
    label: 'Some label',
    placeholder: 'Text Area',
  },
}

export const TextAreaError: Story = {
  args: {
    errorMessage: 'Текст ошибки / подсказка',
    label: 'Some label',
    placeholder: 'Text Area',
    value: 'Some value',
  },
}
