import * as React from 'react'
import { useEffect, useState } from 'react'

import { Page, getSidebarLayout } from '@/components'
import { Button, Card, Tabs, Typography } from '@/components/ui'
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
import {
  useDeleteAllDevicesMutation,
  useDeleteDeviceMutation,
  useGetDevicesQuery,
} from '@/shared/api/devices/devices.api'
import { useTranslation } from '@/shared/hooks'
import { useTabs } from '@/shared/hooks/useTabs'
import { ActiveSessions } from '@/views/profile/devices/ui/activeSessions/ActiveSessions'
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

const Devices = () => {
  const { t } = useTranslation()
  const { activeSessions, currentDevice, terminateSessions } = t.profileSettingsDevices
  const { data } = useGetDevicesQuery()

  const [deleteAllDevices] = useDeleteAllDevicesMutation()
  const [IPList, setIPList] = useState<string[]>([])
  const { browser } = new UAParser().getResult()
  const tabs = useTabs()

  /*const getIP = async () => {
      const response = await fetch('https://api.ipify.org/?format=json')
      const data = await response.json()
      const newIP = data.ip
      const updateIPList = [...IPList, newIP]
      return data.ip
    }*/

  useEffect(() => {
    /*getIP().then(ip => setIP(ip))*/
    fetch('https://api.ipify.org/?format=json')
      .then(res => {
        return res.json()
      })
      .then(data => {
        const newIP = data.ip
        const updateIPList = [...IPList, newIP]

        setIPList(updateIPList)
      })
  }, [])

  const handlerTerminateSessions = () => {
    deleteAllDevices().unwrap()
  }

  return (
    <Page mb={36} mt={36}>
      <Tabs defaultValue={'Devices'} tabs={tabs} />
      <Typography className={s.title} variant={'h3'}>
        {currentDevice}
      </Typography>
      <Card className={s.card}>
        <div>{iconBrowser(browser.name)}</div>
        <div>
          <Typography className={s.browserName} variant={'bold_text_16'}>
            {browser.name}
          </Typography>
          <Typography variant={'regular_text_14'}>
            IP: {IPList.length > 0 ? IPList[0] : 'Loading...'}
          </Typography>
        </div>
      </Card>
      <div className={s.terminateSessions}>
        <Button onClick={handlerTerminateSessions} variant={'outlined'}>
          {terminateSessions}
        </Button>
      </div>
      <Typography variant={'h3'}>{activeSessions}</Typography>
      <div>
        {data?.map(device => (
          <ActiveSessions
            date={device.lastActiveDate}
            deviceID={device.id}
            key={device.id}
            title={device.title}
          />
        ))}
      </div>
    </Page>
  )
}

Devices.getLayout = getSidebarLayout
export default Devices
