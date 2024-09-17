import { StoryObj } from '@storybook/react'

import { Pagination } from './Pagination'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      option: [''],
    },
  },
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
