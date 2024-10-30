import { Button, Card, Typography } from '@/components/ui'
import { LogOutOutlineIcon } from '@/components/ui/icons'
import DesktopIcon from '@/components/ui/icons/DesktopIcon'
import PhoneIcon from '@/components/ui/icons/PhoneIcon'
import { useDeleteDeviceMutation } from '@/shared/api/devices/devices.api'
import { useTranslation } from '@/shared/hooks'

import s from './ActiveSessions.module.scss'

type Props = {
  date: string
  deviceID: string
  deviceName: string
  deviceType: string
  ip: string
}

export const ActiveSessions = ({ date, deviceID, deviceName, deviceType, ip }: Props) => {
  const { t } = useTranslation()
  const { lastVisit, logOut } = t.profileSettingsDevices

  const [deleteDevice] = useDeleteDeviceMutation()

  const getDeviceIcon = (type: string | undefined) => {
    if (type === 'mobile' || window.innerWidth < 768) {
      return <PhoneIcon />
    } else if (type === 'desktop' || window.innerWidth > 768) {
      return <DesktopIcon />
    }
  }

  const handleDeleteDevice = () => {
    deleteDevice(deviceID).unwrap()
  }

  return (
    <Card className={s.card}>
      <div className={s.deviceInfoWrapper}>
        <div>{getDeviceIcon(deviceType)}</div>
        <div>
          <Typography className={s.deviceName} variant={'bold_text_16'}>
            {deviceName}
          </Typography>
          <Typography className={s.ip} variant={'regular_text_14'}>
            {ip}
          </Typography>
          <Typography variant={'small_text'}>
            {lastVisit}: {date}
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
