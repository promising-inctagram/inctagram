import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { DatePickerRange, DatePickerRangeProps } from '@/components/date-picker'

export type ControlledDatePickerRangeProps<T extends FieldValues> = Omit<
  DatePickerRangeProps,
  'disabled' | 'name' | 'onBlur' | 'onChange' | 'onSelectRangeDate' | 'ref' | 'selected' | 'value'
> &
  UseControllerProps<T>

export const ControlledDatePickerRange = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...rest
}: ControlledDatePickerRangeProps<T>) => {
  const {
    field: { onChange, value, ...field },
  } = useController({ control, defaultValue, disabled, name, rules, shouldUnregister })

  return <DatePickerRange onSelectRangeDate={onChange} selected={value} {...field} {...rest} />
}
