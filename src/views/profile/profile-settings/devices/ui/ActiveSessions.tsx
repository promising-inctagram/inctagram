import { Button, Card, Typography } from '@/components/ui'
import { LogOutOutlineIcon } from '@/components/ui/icons'
import DesktopIcon from '@/components/ui/icons/DesktopIcon'
import PhoneIcon from '@/components/ui/icons/PhoneIcon'
import { useDeleteDeviceMutation } from '@/shared/api/devices/devices.api'
import { getDevicesArgs } from '@/shared/api/devices/devices.types'
import { useTranslation } from '@/shared/hooks'
import { useDeviceSize } from '@/views/profile/profile-settings/hooks/useDeviceSize'

import s from './Devices.module.scss'

type Props = {
  device: getDevicesArgs
}

export const ActiveSessions = (props: Props) => {
  const { deviceType, id, ip, lastActiveDate, osName } = props.device

  const { t } = useTranslation()
  const { lastVisit, logOut } = t.profileSettingsDevices
  const isPhoneScreen = useDeviceSize(deviceType)

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
        <div>{isPhoneScreen ? <PhoneIcon /> : <DesktopIcon />}</div>
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
        <Button onClick={handleDeleteDevice} variant={'icon'}>
          <LogOutOutlineIcon />
          {logOut}
        </Button>
      </div>
    </Card>
  )
}
