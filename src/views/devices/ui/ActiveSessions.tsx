import { Button, Card, Typography } from '@/components/ui'
import { LogOutOutlineIcon } from '@/components/ui/icons'
import DesktopIcon from '@/components/ui/icons/DesktopIcon'
import PhoneIcon from '@/components/ui/icons/PhoneIcon'
import { useDeleteDeviceMutation } from '@/shared/api/devices/devices.api'
import { getDevicesArgs } from '@/shared/api/devices/devices.types'
import { useTranslation } from '@/shared/hooks'
import { useGetBrowserIcon } from '@/views/devices/hooks/useGetBrowserIcon'

import s from './Devices.module.scss'

type Props = {
  device: getDevicesArgs
}

export const ActiveSessions = (props: Props) => {
  const { browserName, deviceType, id, ip, lastActiveDate, osName } = props.device

  const { t } = useTranslation()
  const { lastVisit, logOut } = t.profileSettingsDevices
  const browserIcon = useGetBrowserIcon(browserName)
  const [deleteDevice] = useDeleteDeviceMutation()

  const date = new Date(lastActiveDate)
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
  const dateVisit = date.toLocaleDateString('ru-RU', options)

  const handleDeleteDevice = () => {
    deleteDevice(id).unwrap()
  }

  return (
    <Card className={s.cardSessions}>
      <div className={s.deviceInfoWrapper}>
        <div className={s.iconsBlock}>
          {deviceType === 'Desktop' ? <DesktopIcon /> : <PhoneIcon />}
          {browserIcon}
        </div>
        <div>
          <Typography className={s.deviceName} variant={'bold_text_16'}>
            {osName}
          </Typography>
          <Typography className={s.ip} variant={'regular_text_14'}>
            IP: {ip}
          </Typography>
          <Typography variant={'small_text'}>
            {lastVisit}: {dateVisit}
          </Typography>
        </div>
      </div>
      <div>
        <Button className={s.deviceLogoutBtn} onClick={handleDeleteDevice} variant={'icon'}>
          <LogOutOutlineIcon />
          {logOut}
        </Button>
      </div>
    </Card>
  )
}
