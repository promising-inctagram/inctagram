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
  const { deviceName, deviceType, id, ip, lastActiveDate } = props.device

  const { t } = useTranslation()
  const { lastVisit, logOut } = t.profileSettingsDevices
  const isPhoneScreen = useDeviceSize(deviceType)

  const [deleteDevice] = useDeleteDeviceMutation()

  const handleDeleteDevice = () => {
    deleteDevice(id).unwrap()
  }

  return (
    <Card className={s.card}>
      <div className={s.deviceInfoWrapper}>
        <div>{isPhoneScreen ? <PhoneIcon /> : <DesktopIcon />}</div>
        <div>
          <Typography className={s.deviceName} variant={'bold_text_16'}>
            {deviceName}
          </Typography>
          <Typography className={s.ip} variant={'regular_text_14'}>
            {ip}
          </Typography>
          <Typography variant={'small_text'}>
            {lastVisit}: {lastActiveDate}
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
