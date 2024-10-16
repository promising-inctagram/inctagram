import { Button, Card, Typography } from '@/components/ui'
import { LogOutOutlineIcon } from '@/components/ui/icons'
import { useTranslation } from '@/shared/hooks'
import UAParser from 'ua-parser-js'

type Props = {
  date: string | undefined
  title: string
}

export const ActiveSessions = ({ date, title }: Props) => {
  const { t } = useTranslation()
  const { lastVisit, logOut } = t.profileSettingsDevices
  const dataParser = new UAParser(title)

  console.log(dataParser)

  return (
    <Card>
      <div>
        {/* <div>{deviceIcon}</div>*/}
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
