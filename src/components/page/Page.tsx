import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './Page.module.scss'

type PageProps = {
  mb?: CSSProperties['marginBottom']
  ml?: CSSProperties['marginLeft']
  mr?: CSSProperties['marginRight']
  mt?: CSSProperties['marginTop']
} & ComponentPropsWithoutRef<'div'>

type PageRef = ElementRef<'div'>

export const Page = forwardRef<PageRef, PageProps>((props, ref) => {
  const { className, mb = '24px', ml = '4px', mr = '44px', mt = '24px', style, ...rest } = props

  const styles = { marginBottom: mb, marginLeft: ml, marginRight: mr, marginTop: mt, ...style }

  return <div className={clsx(s.page, className)} ref={ref} style={styles} {...rest} />
})
