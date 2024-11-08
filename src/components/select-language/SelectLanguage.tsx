import { ComponentPropsWithoutRef, ElementRef, forwardRef, useMemo } from 'react'

import { OptionsValue, Select } from '@/components/ui'
import { FlagRussiaIcon, FlagUnitedKingdomIcon } from '@/components/ui/icons'
import { useTranslation } from '@/shared/hooks'
import { useIsMobileOrTabletVersion } from '@/shared/hooks/useIsMobileOrTabletVersion'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from './SelectLanguage.module.scss'

export default {}
type SelectLanguageProps = ComponentPropsWithoutRef<typeof Select>
type SelectLanguageRef = ElementRef<typeof Select>

export const SelectLanguage = forwardRef<SelectLanguageRef, SelectLanguageProps>(
  ({ className, ...rest }, ref) => {
    const { asPath, locale, pathname, push, query } = useRouter()
    const { t } = useTranslation()
    const isTablet = useIsMobileOrTabletVersion()

    const languages: OptionsValue[] = [
      {
        icon: <FlagRussiaIcon className={s.icon} />,
        option: isTablet ? '' : t.language.ru,
        value: 'ru',
      },
      {
        icon: <FlagUnitedKingdomIcon className={s.icon} />,
        option: isTablet ? '' : t.language.en,
        value: 'en',
      },
    ]

    const changeLangHandler = (lang: string) => {
      push({ pathname, query }, asPath, { locale: lang })
    }

    return (
      <Select
        className={clsx(s.container, isTablet && s.tabletMenu, className)}
        defaultValue={locale ?? 'en'}
        onValueChange={changeLangHandler}
        options={languages}
        ref={ref}
        {...rest}
      />
    )
  }
)
