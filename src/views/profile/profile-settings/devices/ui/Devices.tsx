import * as React from 'react'
import { useEffect, useState } from 'react'

import { Page, getSidebarLayout } from '@/components'
import { Button, Tabs, Typography } from '@/components/ui'
import { BraveIcon } from '@/components/ui/icons'
import { useGetDevicesQuery } from '@/shared/api/devices/devices.api'
import { useTranslation } from '@/shared/hooks'
import { ActiveSessions } from '@/views/profile/profile-settings/devices/ui/ActiveSessions'
import { CurrentDevice } from '@/views/profile/profile-settings/devices/ui/current-device/CurrentDevice'
import UAParser from 'ua-parser-js'

import s from './Devices.module.scss'

const iconBrowser = (browserName: string | undefined): React.ReactNode => {
  switch (browserName) {
    case 'Chrome':
      return <BraveIcon />
    /* case 'Firefox':
                       return <Firefox />
                     case 'Safari' || 'Mobile Safari':
                       return <Safari />
                     case 'Edge':
                       return <MicrosoftEdge />
                     case 'Opera':
                       return <Opera />
                     case 'Yandex':
                       return <Yandex />
                     case 'Brave':
                       return <Brave />
                     default:
                       return <Browser />
                   }*/
  }
}

const getIP = async () => {
  const response = await fetch('https://api.ipify.org/?format=json')
  const data = await response.json()

  return data.ip
}

const Devices = () => {
  const { t } = useTranslation()
  const { activeSessions, currentDevice, lastVisit, logOut, terminateSessions } =
    t.profileSettingsDevices
  const { data } = useGetDevicesQuery()
  const [IP, setIP] = useState(null)
  const { browser } = new UAParser().getResult()

  useEffect(() => {
    getIP().then(ip => setIP(ip))
  }, [])
  console.log(data)

  return (
    <div className={s.container}>
      <Typography variant={'h3'}>{currentDevice}</Typography>
      <CurrentDevice icon={iconBrowser(browser?.name)} ip={IP} title={browser?.name} />
      <div className={s.terminateSessions}>
        <Button variant={'outlined'}>{terminateSessions}</Button>
      </div>
      <div className={s.container}>
        <Typography variant={'h3'}>{activeSessions}</Typography>
        <div className={s.activeSessions}>
          {data?.map(device => (
            <ActiveSessions date={device.lastActiveDate} key={device.id} title={device.title} />
          ))}
        </div>
      </div>
    </div>
  )
}

Devices.getLayout = getSidebarLayout
export default Devices
