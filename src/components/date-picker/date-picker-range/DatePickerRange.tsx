import { ElementRef, forwardRef } from 'react'
import { DateRange, Locale, PropsRange } from 'react-day-picker'

import { Calendar } from '@/components/date-picker/calendar'
import { useDatePicker } from '@/components/date-picker/hooks'
import { TextField } from '@/components/text-field'
import { Typography } from '@/components/typography'
import { Content, Portal, Root, Trigger } from '@radix-ui/react-popover'
import clsx from 'clsx'

import s from '../date-picker-single/DatePicker.module.scss'

export type DatePickerRangeProps = {
  disabled?: boolean
  error?: string
  isRequired?: boolean
  label?: string
  locale?: Locale
  onSelectRangeDate: (date: DateRange | undefined) => void
  selected?: DateRange | undefined
} & Omit<PropsRange, 'mode'>

type DatePickerRangeRef = ElementRef<typeof TextField>

export const DatePickerRange = forwardRef<DatePickerRangeRef, DatePickerRangeProps>(
  ({ disabled, error, isRequired, label, onSelectRangeDate, selected, ...rest }, ref) => {
    const {
      dayPickerRangeHandler,
      id,
      inputRangeDateChangeHandler,
      inputValue,
      isOpen,
      month,
      setIsOpen,
      setMonth,
      triggerIcon,
    } = useDatePicker({
      disabled,
      error,
      onSelectRangeDate,
    })

    return (
      <div className={s.container}>
        <Typography
          as={'label'}
          grey
          htmlFor={id}
          isRequired={isRequired}
          variant={'regular_text_14'}
        >
          {label}
        </Typography>
        <div className={s.inputContainer}>
          <TextField
            autoComplete={'off'}
            className={clsx(error && s.error)}
            disabled={disabled}
            error={error}
            onChange={inputRangeDateChangeHandler}
            ref={ref}
            value={inputValue}
          />
          <Root onOpenChange={setIsOpen} open={isOpen}>
            <Trigger disabled={disabled} id={id} title={'open calendar'}>
              {triggerIcon}
            </Trigger>
            <Portal>
              <Content align={'start'} avoidCollisions sideOffset={-16}>
                <Calendar
                  mode={'range'}
                  month={month}
                  onMonthChange={setMonth}
                  onSelect={dayPickerRangeHandler}
                  selected={selected}
                  {...rest}
                />
              </Content>
            </Portal>
          </Root>
        </div>
      </div>
    )
  }
)
