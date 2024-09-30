import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/components/ui'

type Props<T extends FieldValues> = Omit<TextFieldProps, 'onBlur' | 'onChange' | 'ref' | 'value'> &
  UseControllerProps<T>

export const ControlledTextField = <T extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...props
}: Props<T>) => {
  const {
    field: { onBlur, onChange, ref, value, ...field },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <TextField onBlur={onBlur} onChange={onChange} ref={ref} value={value} {...props} {...field} />
  )
}
