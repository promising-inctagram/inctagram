import { Card, Typography } from '@/components/ui'

type Props = {
  icon: React.ReactNode
  ip: null | string
  title: string | undefined
}

export const CurrentDevice = ({ icon, ip, title }: Props) => {
  return (
    <Card>
      <div>{icon}</div>
      <div>
        <div>
          <Typography variant={'bold_text_16'}>{title}</Typography>
        </div>
        <div>
          <Typography variant={'regular_text_14'}>IP: {ip}</Typography>
        </div>
      </div>
    </Card>
  )
}
