import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import { Typography } from '@/components/typography'
import * as RadixRadio from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './Radio.module.scss'

//todo: подумать куда вынести общие типы
export type Option = {
  id: string
  label: string
  value: string
}

type RadioProps = {
  options: Option[]
} & ComponentPropsWithoutRef<typeof RadixRadio.Root>
type RadioGroupRef = ElementRef<typeof RadixRadio.Root>

export const Radio = forwardRef<RadioGroupRef, RadioProps>((props, ref) => {
  const { className, disabled, options, ...rest } = props

  const radioGroupId = useId()

  return (
    <RadixRadio.Root className={clsx(s.root, className)} disabled={disabled} ref={ref} {...rest}>
      {options.map(option => (
        <div className={s.itemContainer} key={option.id}>
          <RadixRadio.Item
            className={s.item}
            id={radioGroupId + option.id}
            tabIndex={+option.id}
            value={option.value}
          >
            <RadixRadio.Indicator className={s.indicator} />
          </RadixRadio.Item>
          <Typography
            as={'label'}
            className={clsx(s.label, disabled && s.disabledLabel)}
            htmlFor={radioGroupId + option.id}
          >
            {option.label}
          </Typography>
        </div>
      ))}
    </RadixRadio.Root>
  )
})
