import React, { ComponentPropsWithoutRef } from 'react'

import { Root, Scrollbar, Thumb, Viewport } from '@radix-ui/react-scroll-area'
import clsx from 'clsx'

import s from './ScrollArea.module.scss'

type ScrollAreaProps = ComponentPropsWithoutRef<typeof Root>

export const ScrollArea = ({ children, className, ...rest }: ScrollAreaProps) => (
  <Root className={clsx(s.root, className)} {...rest}>
    <Viewport className={s.viewport}>{children}</Viewport>
    <Scrollbar className={s.scrollbar} orientation={'vertical'}>
      <Thumb className={s.thumb} />
    </Scrollbar>
    <Scrollbar className={s.scrollbar} orientation={'horizontal'}>
      <Thumb className={s.thumb} />
    </Scrollbar>
  </Root>
)
