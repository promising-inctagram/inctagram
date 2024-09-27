import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { Typography } from '@/components/ui'
import clsx from 'clsx'

import s from './Badge.module.scss'

type BadgeProps = {
  children: ReactNode
  count?: number
  variant?: 'dot' | 'standard'
} & ComponentPropsWithoutRef<'div'>

type BadgeRef = ElementRef<'div'>

//todo: подумать куда вынести константы
const MAX_BADGE_COUNT = 99

export const Badge = forwardRef<BadgeRef, BadgeProps>(
  ({ children, count, variant = 'standard', ...rest }, ref) => {
    const isDot = variant === 'dot'
    const showBadge = !!count && count > 0
    const displayCount = !!count && count > MAX_BADGE_COUNT ? MAX_BADGE_COUNT : count

    return (
      <div className={s.root} {...rest} ref={ref}>
        {showBadge && (
          <Typography as={'span'} className={clsx(s.badge, s[variant])} variant={'badge'}>
            {!isDot && displayCount}
          </Typography>
        )}
        {children}
      </div>
    )
  }
)
