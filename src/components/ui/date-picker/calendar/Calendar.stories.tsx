import { Calendar } from '@/components/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: Calendar,
  tags: ['autodocs'],
  title: 'Components/DatePicker/Calendar',
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const CalendarStory: Story = {
  name: 'Calendar',
}
