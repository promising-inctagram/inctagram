import { Locale, PropsSingle } from 'react-day-picker'

import { Content, Portal, Root, Trigger } from '@radix-ui/react-popover'
import clsx from 'clsx'

import s from './DatePicker.module.scss'

import { TextField } from '../../text-field'
import { Typography } from '../../typography'
import { Calendar } from '../calendar'
import { useDatePicker } from '../hooks'

type DatePickerProps = {
  disabled?: boolean
  error?: string
  isRequired?: boolean
  label?: string
  locale?: Locale
  onSelectSingleDate: (date: Date | undefined) => void
  selected?: Date | undefined
} & Omit<PropsSingle, 'mode'>

export const DatePicker = ({
  disabled,
  error,
  isRequired,
  label,
  onSelectSingleDate,
  selected,
  ...rest
}: DatePickerProps) => {
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
          error={error}
          onChange={inputSingleDateChangeHandler}
          value={inputValue}
        />
        <Root onOpenChange={setIsOpen} open={isOpen}>
          <Trigger disabled={disabled} id={id} title={'open calendar'}>
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