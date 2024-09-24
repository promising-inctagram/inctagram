import { ChangeEvent, useId, useState } from 'react'
import { DateRange } from 'react-day-picker'

import { CalendarIcon, CalendarOutlineIcon } from '@/components/icons'
import clsx from 'clsx'
import { format, isValid, parse } from 'date-fns'

import s from '@/components/date-picker/date-picker-single/DatePicker.module.scss'

type UseDatePickerArgs = {
  disabled?: boolean
  error?: string
  onSelectRangeDate?: (date: DateRange | undefined) => void
  onSelectSingleDate?: (date: Date | undefined) => void
}

export const useDatePicker = ({
  disabled,
  error,
  onSelectRangeDate,
  onSelectSingleDate,
}: UseDatePickerArgs) => {
  const [isOpen, setIsOpen] = useState(false)
  const [month, setMonth] = useState(new Date())
  const [inputValue, setInputValue] = useState('')
  const id = useId()

  const iconCN = clsx(s.icon, error && s.error, disabled && s.disabled)

  const triggerIcon = isOpen ? (
    <CalendarIcon className={iconCN} tabIndex={1} />
  ) : (
    <CalendarOutlineIcon className={iconCN} />
  )

  const inputSingleDateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    setInputValue(newValue)

    const parsedDate = parse(newValue, 'dd/MM/yyyy', new Date())

    if (isValid(parsedDate)) {
      onSelectSingleDate?.(parsedDate)
      setMonth(parsedDate)
    } else {
      onSelectSingleDate?.(undefined)
    }
  }

  const inputRangeDateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    setInputValue(newValue)

    const [start, end] = newValue.split(' - ').map(date => parse(date, 'dd/MM/yyyy', new Date()))

    if (isValid(start) && isValid(end)) {
      onSelectRangeDate?.({ from: start, to: end })
      setMonth(start)
    } else {
      onSelectRangeDate?.(undefined)
    }
  }

  const dayPickerSingleHandler = (date: Date | undefined) => {
    if (!date) {
      setInputValue('')
      onSelectSingleDate?.(undefined)
    } else {
      onSelectSingleDate?.(date)
      setInputValue(format(date, 'dd/MM/yyyy'))
    }
    setIsOpen(false)
  }

  const dayPickerRangeHandler = (date: DateRange | undefined) => {
    if (!date) {
      setInputValue('')
      onSelectRangeDate?.(undefined)
    } else {
      const { from, to } = date
      let formattedValue = ''

      if (from && !to) {
        formattedValue = format(from, 'dd/MM/yyyy') + ' - ' + 'choose end date'
      } else if (from && to) {
        formattedValue = format(from, 'dd/MM/yyyy') + ' - ' + format(to, 'dd/MM/yyyy')
      }

      setInputValue(formattedValue)
      onSelectRangeDate?.(date)
    }
  }

  return {
    dayPickerRangeHandler,
    dayPickerSingleHandler,
    id,
    inputRangeDateChangeHandler,
    inputSingleDateChangeHandler,
    inputValue,
    isOpen,
    month,
    setIsOpen,
    setMonth,
    triggerIcon,
  }
}
