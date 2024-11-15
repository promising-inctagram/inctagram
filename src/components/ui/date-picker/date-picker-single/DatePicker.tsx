import { ElementRef, ReactNode, forwardRef } from 'react'
import { Locale, PropsSingle } from 'react-day-picker'

import { Calendar, TextField, Typography, useDatePicker } from '@/components/ui'
import { Content, Portal, Root, Trigger } from '@radix-ui/react-popover'
import clsx from 'clsx'

import s from './DatePicker.module.scss'

export type DatePickerProps = {
  disabled?: boolean
  error?: ReactNode | string
  inputVal: string
  isRequired?: boolean
  label?: string
  locale?: Locale
  onSelectSingleDate: (date: Date | undefined) => void
  selected?: Date | undefined
} & Omit<PropsSingle, 'mode'>

type DatePickerRef = ElementRef<typeof TextField>

export const DatePicker = forwardRef<DatePickerRef, DatePickerProps>(
  (
    { disabled, error, inputVal, isRequired, label, onSelectSingleDate, selected, ...rest },
    ref
  ) => {
    const {
      dayPickerSingleHandler,
      id,
      inputSingleDateChangeHandler,
      inputValue,
      isOpen,
      month,
      setIsOpen,
      setMonth,
      triggerIcon,
    } = useDatePicker({
      disabled,
      error,
      onSelectSingleDate,
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
            errorMessage={error}
            onChange={inputSingleDateChangeHandler}
            ref={ref}
            value={inputValue || inputVal}
          />
          <Root onOpenChange={setIsOpen} open={isOpen}>
            <Trigger id={id} title={'open calendar'}>
              {triggerIcon}
            </Trigger>
            <Portal>
              <Content align={'start'} avoidCollisions sideOffset={-16}>
                <Calendar
                  mode={'single'}
                  month={month}
                  onMonthChange={setMonth}
                  onSelect={dayPickerSingleHandler}
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
