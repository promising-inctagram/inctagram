import { useState } from 'react'
import {
  DateRange,
  DayFlag,
  DayPicker,
  type DayPickerProps,
  SelectionState,
  UI,
} from 'react-day-picker'

import { ArrowIosBackIcon, ArrowIosForwardIcon } from '@/components/icons'
import { enUS, ru } from 'date-fns/locale'

import s from './Calendar.module.scss'

// todo: подумать куда вынести enums
enum WeekDays {
  Monday = 1,
}

export const Calendar = ({
  className,
  classNames,
  fixedWeeks = true,
  locale = enUS,
  weekStartsOn = WeekDays.Monday,
}: DayPickerProps) => {
  const [selected, setSelected] = useState<DateRange>()

  return (
    <DayPicker
      className={className}
      classNames={{
        [DayFlag.focused]: s.focused,
        [DayFlag.outside]: s.outside,
        [DayFlag.today]: s.today,
        [SelectionState.range_end]: s.rangeEnd,
        [SelectionState.range_middle]: s.rangeMiddle,
        [SelectionState.range_start]: s.rangeStart,
        [SelectionState.selected]: s.selected,
        [UI.CaptionLabel]: s.captionLabel,
        [UI.Day]: s.day,
        [UI.DayButton]: s.dayButton,
        [UI.Month]: s.month,
        [UI.MonthCaption]: s.monthCaption,
        [UI.MonthGrid]: s.monthGrid,
        [UI.Months]: s.months,
        [UI.Nav]: s.nav,

        [UI.NextMonthButton]: s.nextMonthButton,
        [UI.PreviousMonthButton]: s.PreviousMonthButton,
        [UI.Root]: s.root,
        [UI.Weekday]: s.weekday,
        ...classNames,
      }}
      components={{
        Chevron: props => {
          if (props.orientation === 'left') {
            return <ArrowIosBackIcon {...props} />
          }

          return <ArrowIosForwardIcon {...props} />
        },
      }}
      fixedWeeks={fixedWeeks}
      locale={ru}
      mode={'range'}
      modifiers={{
        saturday: { dayOfWeek: [6] },
        sunday: { dayOfWeek: [0] },
      }}
      modifiersClassNames={{
        saturday: s.weekend,
        sunday: s.weekend,
      }}
      onSelect={setSelected}
      selected={selected}
      weekStartsOn={weekStartsOn}
    />
  )
}
