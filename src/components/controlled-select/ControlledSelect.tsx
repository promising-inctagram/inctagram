import { useController } from 'react-hook-form'

import { Select } from '@/components/ui'

export type ControlledSelectProps = {}

export const ControlledSelect = () => {
  const {
    field: { onChange, value, ...field },
  } = useController()

  return (
    <Select
      defaultValue={}
      //   label={}
      onValueChange={}
      options={}
      //   placeHolder={}
      value={}
      // ...rest
    />
  )
}
