import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './Page.module.scss'

type PageProps = {
  pb?: CSSProperties['marginBottom']
  pt?: CSSProperties['marginTop']
} & ComponentPropsWithoutRef<'div'>

type PageRef = ElementRef<'div'>

export const Page = forwardRef<PageRef, PageProps>((props, ref) => {
  const { className, pb = '24px', pt = '24px', style, ...rest } = props

  const styles = { paddingBottom: pb, paddingTop: pt, ...style }

  return <div className={clsx(s.page, className)} ref={ref} style={styles} {...rest} />
})
