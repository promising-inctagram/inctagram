import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Radio, RadioProps } from '@/components/ui'

export type ControlledRadioProps<T extends FieldValues> = Omit<
  RadioProps,
  'asChild' | 'defaultValue' | 'disabled' | 'name' | 'onValueChange' | 'value'
> &
  UseControllerProps<T>

export const ControlledRadio = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  options,
  rules,
  shouldUnregister,
  ...props
}: ControlledRadioProps<T>) => {
  const {
    field: { onChange, ...field },
  } = useController({ control, defaultValue, disabled, name, rules, shouldUnregister })

  return <Radio onValueChange={onChange} options={options} {...props} {...field} />
}
