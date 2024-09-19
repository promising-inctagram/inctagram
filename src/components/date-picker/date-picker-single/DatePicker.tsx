import { ChangeEvent, useEffect, useId, useState } from 'react'
import { PropsSingle } from 'react-day-picker'

import { CalendarIcon, CalendarOutlineIcon } from '@/components/icons'
import { TextField } from '@/components/text-field'
import { Typography } from '@/components/typography'
import { Content, Portal, Root, Trigger } from '@radix-ui/react-popover'
import { format, isValid, parse } from 'date-fns'

import s from './DatePicker.module.scss'

import { Calendar } from '../calendar'

type DatePickerProps = {
  error?: string
  isRequired?: boolean
  label?: string
} & Omit<PropsSingle, 'mode'>

export const DatePicker = ({ error, isRequired, label, ...rest }: DatePickerProps) => {
  const id = useId()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [month, setMonth] = useState(new Date())
  const [inputValue, setInputValue] = useState('')

  const triggerIcon = isOpen ? (
    <CalendarIcon className={s.icon} />
  ) : (
    <CalendarOutlineIcon className={s.icon} />
  )

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)

    const parsedDate = parse(e.target.value, 'dd/MM/yyyy', new Date())

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate)
      setMonth(parsedDate)
    } else {
      setSelectedDate(undefined)
    }
  }

  const dayPickerSelectHandler = (date: Date | undefined) => {
    if (!date) {
      setInputValue('')
      setSelectedDate(undefined)
    } else {
      setSelectedDate(date)
      setInputValue(format(date, 'dd/MM/yyyy'))
    }
    setIsOpen(false)
  }

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
        <TextField autoComplete={'off'} onChange={inputChangeHandler} value={inputValue} />
        <Root onOpenChange={setIsOpen} open={isOpen}>
          <Trigger id={id}>{triggerIcon}</Trigger>
          <Portal>
            <Content align={'start'} avoidCollisions sideOffset={-16}>
              <Calendar
                mode={'single'}
                month={month}
                onMonthChange={setMonth}
                onSelect={dayPickerSelectHandler}
                selected={selectedDate}
                {...rest}
              />
            </Content>
          </Portal>
        </Root>
      </div>
      {error && (
        <Typography as={'span'} variant={'error'}>
          {error}
        </Typography>
      )}
    </div>
  )
}
