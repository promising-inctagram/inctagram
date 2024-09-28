import { ComponentPropsWithoutRef, ElementRef, forwardRef, useMemo } from 'react'

import { OptionsValue, Select } from '@/components/ui'
import { FlagRussiaIcon, FlagUnitedKingdomIcon } from '@/components/ui/icons'
import { useTranslation } from '@/shared/hooks'
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

    const languages: OptionsValue[] = useMemo(
      () => [
        { icon: <FlagRussiaIcon className={s.icon} />, option: t.language.ru, value: 'ru' },
        { icon: <FlagUnitedKingdomIcon className={s.icon} />, option: t.language.en, value: 'en' },
      ],
      [t.language.ru, t.language.en]
    )

    const changeLangHandler = (lang: string) => {
      push({ pathname, query }, asPath, { locale: lang })
    }

    return (
      <Select
        className={clsx(s.container, className)}
        defaultValue={locale}
        onValueChange={changeLangHandler}
        options={languages}
        ref={ref}
        {...rest}
      />
    )
  }
)
