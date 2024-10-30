import { ReactNode } from 'react'

import { Page, getSidebarLayout } from '@/components'
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
import { useDeleteAllDevicesMutation, useGetDevicesQuery } from '@/shared/api/devices/devices.api'
import { useTranslation } from '@/shared/hooks'
import { ActiveSessions } from '@/views/profile/profile-settings/devices/ui/activeSessions/ActiveSessions'

import s from './Devices.module.scss'

const iconBrowser = (browserName: string | undefined): ReactNode => {
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

const Devices = () => {
  const { t } = useTranslation()
  const { activeSessions, currentDevice, terminateSessions } = t.profileSettingsDevices
  const { data } = useGetDevicesQuery()
  const [deleteAllDevices] = useDeleteAllDevicesMutation()

  const handlerTerminateSessions = () => {
    deleteAllDevices().unwrap()
  }
  const currentClientDevice = data?.find(el => el.current)

  return (
    <Page mb={36} mt={36}>
      <Typography className={s.title} variant={'h3'}>
        {currentDevice}
      </Typography>
      <Card className={s.card}>
        <div>{iconBrowser(currentClientDevice?.browserName)}</div>
        <div>
          <Typography className={s.browserName} variant={'bold_text_16'}>
            {currentClientDevice?.browserName}
          </Typography>
          <Typography variant={'regular_text_14'}>IP: {currentClientDevice?.ip}</Typography>
        </div>
      </Card>
      <div className={s.terminateSessions}>
        <Button onClick={handlerTerminateSessions} variant={'outlined'}>
          {terminateSessions}
        </Button>
      </div>
      <Typography className={s.activeSessionsTitle} variant={'h3'}>
        {activeSessions}
      </Typography>
      <div className={s.activeSessionsWrapper}>
        {data?.map(device => (
          <ActiveSessions
            date={device.lastActiveDate}
            deviceID={device.id}
            deviceName={device.deviceName}
            deviceType={device.deviceType}
            ip={device.ip}
            key={device.id}
          />
        ))}
      </div>
    </Page>
  )
}

Devices.getLayout = getSidebarLayout
export default Devices
