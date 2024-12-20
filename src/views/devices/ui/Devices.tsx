import { getSidebarLayout } from '@/components'
import { Button, Card, Typography } from '@/components/ui'
import { useDeleteAllDevicesMutation, useGetDevicesQuery } from '@/shared/api/devices/devices.api'
import { useTranslation } from '@/shared/hooks'
import { useGetBrowserIcon } from '@/views/devices/hooks/useGetBrowserIcon'
import { ActiveSessions } from '@/views/devices/ui/ActiveSessions'

import s from './Devices.module.scss'

const Devices = () => {
  const { t } = useTranslation()
  const { activeSessions, currentDevice, terminateSessions } = t.profileSettingsDevices
  const { data } = useGetDevicesQuery()
  const [deleteAllDevices] = useDeleteAllDevicesMutation()

  const handlerTerminateSessions = () => {
    deleteAllDevices().unwrap()
  }
  const currentClientDevice = data?.find(el => el.current)
  const otherActiveDevices = data?.filter(device => !device.current)
  const browserIcon = useGetBrowserIcon(currentClientDevice?.browserName)

  return (
    <div className={s.container}>
      <Typography className={s.title} variant={'h3'}>
        {currentDevice}
      </Typography>
      <Card className={s.cardDevices}>
        <div>{browserIcon}</div>
        <div>
          <Typography className={s.browserName} variant={'bold_text_16'}>
            {currentClientDevice?.browserName}
          </Typography>
          <Typography variant={'regular_text_14'}>IP: {currentClientDevice?.ip}</Typography>
        </div>
      </Card>
      {(otherActiveDevices ?? []).length > 0 && (
        <>
          <div className={s.terminateSessions}>
            <Button onClick={handlerTerminateSessions} variant={'outlined'}>
              {terminateSessions}
            </Button>
          </div>
          <Typography className={s.activeSessionsTitle} variant={'h3'}>
            {activeSessions}
          </Typography>
          <div className={s.activeSessionsWrapper}>
            {otherActiveDevices
              ?.filter(device => !device.current)
              .map(device => <ActiveSessions device={device} key={device.id} />)}
          </div>
        </>
      )}
    </div>
  )
}

Devices.getLayout = getSidebarLayout
export default Devices
