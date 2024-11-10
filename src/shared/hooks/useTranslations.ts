import { LocaleType, en } from '@/locales/en'
import { ru } from '@/locales/ru'
import { useRouter } from 'next/router'

type Translations = {
  [key: string]: LocaleType
}

const translations: Translations = {
  en,
  ru,
}

export const useTranslation = () => {
  const { locale } = useRouter()

  console.log('locale', locale)

  if (!locale || !translations[locale]) {
    return { t: translations.en }
  }

  const t = translations[locale]

  return { locale, t }
}
