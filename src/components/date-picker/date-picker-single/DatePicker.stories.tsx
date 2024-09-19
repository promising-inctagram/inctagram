import { DatePicker } from '@/components/date-picker/date-picker-single/DatePicker'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: DatePicker,
  tags: ['autodocs'],
  title: 'Components/DatePicker/DatePicker',
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const DatePickerStory: Story = {
  args: {
    // isRequired: true,
    label: 'DatePicker label',
  },
  name: 'DatePicker Single',
  render: args => (
    <div>
      <DatePicker isRequired {...args} />
      <DatePicker {...args} />
      <DatePicker {...args} />
      <DatePicker {...args} />
      <DatePicker {...args} />
      <DatePicker {...args} />
      <DatePicker {...args} />
      <DatePicker {...args} />
      <DatePicker {...args} />
      <DatePicker {...args} />
      <DatePicker {...args} />
      <DatePicker {...args} />
    </div>
  ),
}
