import { DayFlag, DayPicker, type DayPickerProps, SelectionState, UI } from 'react-day-picker'

import { ArrowIosBackIcon, ArrowIosForwardIcon } from '@/components/icons'
import { enUS } from 'date-fns/locale'

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
  ...rest
}: DayPickerProps) => {
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
        [UI.Chevron]: s.icon,
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
      locale={locale}
      modifiers={{
        saturday: { dayOfWeek: [6] },
        sunday: { dayOfWeek: [0] },
      }}
      modifiersClassNames={{
        saturday: s.weekend,
        sunday: s.weekend,
      }}
      weekStartsOn={weekStartsOn}
      {...rest}
    />
  )
}
