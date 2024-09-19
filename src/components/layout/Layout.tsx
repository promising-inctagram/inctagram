import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { clsx } from 'clsx'

type LayoutProps = ComponentPropsWithoutRef<'div'>
export const Layout = forwardRef<ElementRef<'div'>, LayoutProps>(({ className, ...rest }, ref) => {
  const classes = clsx(className)

  return <div ref={ref} {...rest} />
})
