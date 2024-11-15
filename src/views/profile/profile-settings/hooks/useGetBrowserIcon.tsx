import { ReactNode } from 'react'

import {
  BraveIcon,
  ChromeIcon,
  FirefoxIcon,
  MSEdgeIcon,
  OperaIcon,
  SafariIcon,
  UcBrowserIcon,
  YandexIcon,
} from '@/components/ui/icons'

export const useGetBrowserIcon = (browserName: string | undefined): ReactNode => {
  switch (browserName) {
    case 'Chrome':
      return <ChromeIcon />
    case 'Firefox':
      return <FirefoxIcon />
    case 'Safari':
      return <SafariIcon />
    case 'Edge':
      return <MSEdgeIcon />
    case 'Opera':
      return <OperaIcon />
    case 'Yandex':
      return <YandexIcon />
    case 'Brave':
      return <BraveIcon />
    default:
      return <UcBrowserIcon />
  }
}
