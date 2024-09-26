import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { ArrowIosDownOutlineIcon } from '@/components/ui/icons'
import * as RadixSelect from '@radix-ui/react-select'
import { SelectGroup, SelectItem } from '@radix-ui/react-select'
import { clsx } from 'clsx'

import s from './Select.module.scss'

import { Typography } from '../typography'
export type OptionsValue = {
  icon?: ReactNode
  id?: string
  value?: string
}
type SelectProps = {
  className?: string
  label?: string
  options?: OptionsValue[]
  placeHolder?: string
} & ComponentPropsWithoutRef<typeof RadixSelect.Root>
export const Select = forwardRef<ElementRef<typeof RadixSelect.Trigger>, SelectProps>(
  (
    {
      className,
      defaultValue,
      disabled,
      label,
      onValueChange,
      options,
      placeHolder,
      value,
      ...rest
    },
    ref
  ) => {
    const mappedOptions = options?.map(option => (
      <SelectItem className={s.selectItem} key={option.value} value={option?.value || ''}>
        <RadixSelect.ItemText>
          <div className={s.selectItemFlex}>
            {option.icon && option.icon}
            <Typography as={'span'}>{option.value}</Typography>
          </div>
        </RadixSelect.ItemText>
      </SelectItem>
    ))

    return (
      <div className={s.container}>
        <RadixSelect.Root
          defaultValue={defaultValue}
          disabled={disabled}
          onValueChange={onValueChange}
          value={value}
          {...rest}
        >
          {label && (
            <Typography as={'label'} className={s.label}>
              {label}
            </Typography>
          )}
          <RadixSelect.Trigger className={clsx(s.trigger, className)} ref={ref}>
            <RadixSelect.Value placeholder={placeHolder} />
            <RadixSelect.Icon>
              <ArrowIosDownOutlineIcon className={s.icon} />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>
          <RadixSelect.Portal>
            <RadixSelect.Content className={s.content} position={'popper'}>
              <RadixSelect.Viewport>
                <SelectGroup>{mappedOptions}</SelectGroup>
              </RadixSelect.Viewport>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>
      </div>
    )
  }
)
