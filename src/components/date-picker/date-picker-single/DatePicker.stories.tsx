import { useState } from 'react'

import { DatePicker } from '@/components/date-picker/date-picker-single/DatePicker'
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
  component: DatePicker,
  tags: ['autodocs'],
  title: 'Components/DatePicker/Single',
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const DatePickerStoryEN: Story = {
  args: {
    label: 'DatePicker label',
    locale: enUS,
    onSelectSingleDate: () => {},
  },
  name: 'DatePicker Single EN',

  render: args => {
    // remove onSelectSingleDate from args to avoid passing it to DatePicker for storybook
    const { onSelectSingleDate, ...rest } = args
    const [selectedDate, setSelectedDate] = useState<Date | undefined>()

    return <DatePicker onSelectSingleDate={setSelectedDate} selected={selectedDate} {...rest} />
  },
}

export const DatePickerStoryRU: Story = {
  args: {
    label: 'DatePicker label',
    locale: ru,
    onSelectSingleDate: () => {},
  },
  name: 'DatePicker Single RU',

  render: args => {
    // remove onSelectSingleDate from args to avoid passing it to DatePicker for storybook
    const { onSelectSingleDate, ...rest } = args
    const [selectedDate, setSelectedDate] = useState<Date | undefined>()

    return <DatePicker onSelectSingleDate={setSelectedDate} selected={selectedDate} {...rest} />
  },
}
