import { useState } from 'react'
import { DateRange } from 'react-day-picker'

import { DatePickerRange } from '@/components/date-picker/date-picker-range'
import { Meta, StoryObj } from '@storybook/react'
import { enUS, ru } from 'date-fns/locale'

const meta = {
  argTypes: {
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
    label: {
      control: {
        type: 'text',
      },
    },
  },
  component: DatePickerRange,
  tags: ['autodocs'],
  title: 'Components/DatePicker/Range',
} satisfies Meta<typeof DatePickerRange>

export default meta
type Story = StoryObj<typeof meta>

export const DatePickerRangeStoryEN: Story = {
  args: {
    label: 'DatePicker label',
    locale: enUS,
    onSelectRangeDate: () => {},
  },
  name: 'DatePicker Range EN',

  render: args => {
    // remove onSelectRangeDate from args to avoid passing it to DatePicker for storybook
    const { onSelectRangeDate, ...rest } = args
    const [selectedDate, setSelectedDate] = useState<DateRange | undefined>()

    return <DatePickerRange onSelectRangeDate={setSelectedDate} selected={selectedDate} {...rest} />
  },
}

export const DatePickerRangeStoryRU: Story = {
  args: {
    label: 'DatePicker label',
    locale: ru,
    onSelectRangeDate: () => {},
  },
  name: 'DatePicker Range RU',

  render: args => {
    // remove onSelectRangeDate from args to avoid passing it to DatePicker for storybook
    const { onSelectRangeDate, ...rest } = args
    const [selectedDate, setSelectedDate] = useState<DateRange | undefined>()

    return <DatePickerRange onSelectRangeDate={setSelectedDate} selected={selectedDate} {...rest} />
  },
}
