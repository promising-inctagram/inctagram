import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/components/checkbox'

export type ControlledCheckboxProps<T extends FieldValues> = Omit<
  CheckboxProps,
  | 'checked'
  | 'defaultValue'
  | 'disabled'
  | 'name'
  | 'onBlur'
  | 'onChange'
  | 'onCheckedChange'
  | 'ref'
  | 'value'
> &
  UseControllerProps<T>

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...checkboxProps
}: ControlledCheckboxProps<T>) => {
  const {
    field: { onChange, value, ...field },
  } = useController({ control, defaultValue, disabled, name, rules, shouldUnregister })

  return <Checkbox {...checkboxProps} checked={value} onCheckedChange={onChange} {...field} />
}
