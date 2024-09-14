import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { ArrowIosDownOutlineIcon } from '@/components/icons'
import { Typography } from '@/components/typography'
import * as RadixSelect from '@radix-ui/react-select'
import { SelectGroup, SelectItem } from '@radix-ui/react-select'
import { clsx } from 'clsx'

import s from './select.module.scss'

type SelectProps = {
  className?: string
  label?: string
  options?: string[]
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
      options = ['apple', 'banana', 'orange'],
      placeHolder,
      value,
      ...rest
    },
    ref
  ) => {
    const mappedOptions = options?.map((option, i) => (
      <SelectItem className={s.selectItem} key={option + i} value={option}>
        {option}
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
          {label && <Typography className={s.label}>{label}</Typography>}
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
