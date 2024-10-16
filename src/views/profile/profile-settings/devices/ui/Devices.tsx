import * as React from 'react'
import { useEffect, useState } from 'react'

import { getSidebarLayout } from '@/components'
import { Button, Card, Typography } from '@/components/ui'
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
import { useGetDevicesQuery } from '@/shared/api/devices/devices.api'
import { useTranslation } from '@/shared/hooks'
import { ActiveSessions } from '@/views/profile/profile-settings/devices/ui/ActiveSessions'
import UAParser from 'ua-parser-js'

import s from './Devices.module.scss'

const iconBrowser = (browserName: string | undefined): React.ReactNode => {
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

const getIP = async () => {
  const response = await fetch('https://api.ipify.org/?format=json')
  const data = await response.json()

  return data.ip
}

const Devices = () => {
  const { t } = useTranslation()
  const { activeSessions, currentDevice, terminateSessions } = t.profileSettingsDevices
  const { data } = useGetDevicesQuery()
  const [IP, setIP] = useState(null)
  const { browser } = new UAParser().getResult()

  useEffect(() => {
    getIP().then(ip => setIP(ip))
  }, [])
  console.log(data)

  return (
    <div>
      <Typography className={s.title} variant={'h3'}>
        {currentDevice}
      </Typography>
      <Card className={s.card}>
        <div>{iconBrowser(browser.name)}</div>
        <div>
          <Typography className={s.browserName} variant={'bold_text_16'}>
            {browser.name}
          </Typography>
          <Typography variant={'regular_text_14'}>IP: {IP}</Typography>
        </div>
      </Card>
      <div className={s.terminateSessions}>
        <Button variant={'outlined'}>{terminateSessions}</Button>
      </div>
      <Typography variant={'h3'}>{activeSessions}</Typography>
      <div>
        {data?.map(device => (
          <ActiveSessions date={device.lastActiveDate} key={device.id} title={device.title} />
        ))}
      </div>
    </div>
  )
}

Devices.getLayout = getSidebarLayout
export default Devices
