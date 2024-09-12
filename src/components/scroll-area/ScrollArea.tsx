import React, { ComponentPropsWithoutRef } from 'react'

import * as RadixScrollArea from '@radix-ui/react-scroll-area'

import s from './ScrollArea.module.scss'

type ScrollAreaProps = {
  type?: RadixScrollArea.ScrollAreaProps['type']
} & ComponentPropsWithoutRef<typeof RadixScrollArea.Root>

export const ScrollArea = ({ children, type = 'always' }: ScrollAreaProps) => (
  <RadixScrollArea.Root className={s.root} type={type}>
    <RadixScrollArea.Viewport className={s.viewport}>{children}</RadixScrollArea.Viewport>
    <RadixScrollArea.Scrollbar className={s.scrollbar} orientation={'vertical'}>
      <RadixScrollArea.Thumb asChild className={s.thumb} />
    </RadixScrollArea.Scrollbar>
    <RadixScrollArea.Scrollbar className={s.scrollbar} orientation={'horizontal'}>
      <RadixScrollArea.Thumb asChild className={s.thumb} />
    </RadixScrollArea.Scrollbar>
    <RadixScrollArea.Corner className={s.corner} />
  </RadixScrollArea.Root>
)
