import { Button, Card, Typography } from '@/components/ui'
import { LogOutOutlineIcon } from '@/components/ui/icons'
import DesktopIcon from '@/components/ui/icons/DesktopIcon'
import PhoneIcon from '@/components/ui/icons/PhoneIcon'
import { useTranslation } from '@/shared/hooks'
import UAParser from 'ua-parser-js'

type Props = {
  date: string | undefined
  title: string
}

export const ActiveSessions = ({ date, title }: Props) => {
  const { t } = useTranslation()
  const { lastVisit, logOut } = t.profileSettingsDevices
  const { type } = new UAParser().getDevice()

  const getDeviceType = (type: string | undefined) => {
    if (type === 'mobile' || window.innerWidth < 768) {
      return <PhoneIcon />
    } else if (type === 'desktop' || window.innerWidth > 768) {
      return <DesktopIcon />
    }
  }

  return (
    <Card>
      <div>
        <div>{getDeviceType(type)}</div>
        <div>
          <Typography variant={'bold_text_16'}>{title}</Typography>
          <Typography variant={'small_text'}>
            {lastVisit}: {date}
          </Typography>
        </div>
      </div>
      <div>
        <Button variant={'icon'}>
          <LogOutOutlineIcon />
          {logOut}
        </Button>
      </div>
    </Card>
  )
}
