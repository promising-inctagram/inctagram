import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { ReactElement } from 'react'
import { ReactNode } from 'react'

import { ArrowIosDownOutlineIcon } from '@/components/icons'
import { Typography } from '@/components/typography'
import * as RadixSelect from '@radix-ui/react-select'
import { SelectGroup, SelectItem } from '@radix-ui/react-select'
import { clsx } from 'clsx'

import s from './select.module.scss'
export type OptionsValue = {
  id?: string
  image?: ReactNode
  title?: string
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
    const mappedOptions = options?.map((option, i) => (
      <SelectItem className={s.selectItem} key={option + i} value={option}>
        <div className={s.selectItemFlex}>
          {option.image}
          <RadixSelect.ItemText>
            <Typography as={'span'}>{option}</Typography>
          </RadixSelect.ItemText>
        </div>
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
