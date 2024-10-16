import { Button, Card, Typography } from '@/components/ui'
import { LogOutOutlineIcon } from '@/components/ui/icons'
import { useTranslation } from '@/shared/hooks'

type Props = {
  date: string | undefined
  title: string
}

export const ActiveSessions = ({ date, title }: Props) => {
  const { t } = useTranslation()
  const { activeSessions, currentDevice, lastVisit, logOut, terminateSessions } =
    t.profileSettingsDevices

  return (
    <Card>
      <div>
        {/* <div>{deviceIcon}</div>*/}
        <div>
          <Typography variant={'bold_text_16'}>{title}</Typography>
          <div>
            <Typography variant={'small_text'}>
              {lastVisit}: {date}
            </Typography>
          </div>
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
