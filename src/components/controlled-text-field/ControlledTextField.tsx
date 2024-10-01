import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/components/ui'

type ControlledTextFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'disabled' | 'onBlur' | 'onChange' | 'ref' | 'value'
> &
  UseControllerProps<T>

export const ControlledTextField = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  errorMessage,
  name,
  rules,
  shouldUnregister,
  ...props
}: ControlledTextFieldProps<T>) => {
  const {
    field: { onBlur, onChange, ref, value, ...field },
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <TextField
      {...props}
      error={errorMessage ?? error?.message}
      onBlur={onBlur}
      onChange={onChange}
      ref={ref}
      value={value ?? ''}
      {...field}
    />
  )
}
