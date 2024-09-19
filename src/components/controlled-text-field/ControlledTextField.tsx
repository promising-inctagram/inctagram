import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/components/text-field'

type Props<T extends FieldValues> = Omit<
  TextFieldProps,
  'error' | 'helperText' | 'onChange' | 'ref' | 'value'
> &
  UseControllerProps<T>

export const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  ...props
}: Props<T>) => {
  const {
    field: { ...field },
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return <TextField {...props} error={error?.message} {...field} />
}
