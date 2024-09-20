import { Meta, StoryObj } from '@storybook/react'

import { CheckBox } from './Checkbox'

const meta: Meta<typeof CheckBox> = {
  argTypes: {
    checked: {
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    error: {
      control: {
        type: 'text',
      },
    },
    isRequired: {
      control: {
        type: 'boolean',
      },
    },
  },
  component: CheckBox,
  tags: ['autodocs'],
  title: 'components/CheckBox',
}

export default meta
type Story = StoryObj<typeof CheckBox>

export const DefaultStory: Story = {
  args: {
    isRequired: true,
    label: 'CheckBox label',
  },
  name: 'CheckBox',
}

export const DisabledStory: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'CheckBox label',
  },
  name: 'Disabled CheckBox',
}

export const ErrorStory: Story = {
  args: {
    checked: true,
    error: 'Some error occurred',
    label: 'CheckBox label',
  },
  name: 'CheckBox with Error',
}
