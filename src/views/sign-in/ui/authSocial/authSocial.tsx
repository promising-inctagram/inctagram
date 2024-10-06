import { Button } from '@/components/ui'
import { GithubIcon, GoogleIcon } from '@/components/ui/icons'

type Props = {}
export const AuthSocial = (props: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '60px',
        justifyContent: 'center',
        margin: '13px 0 24px',
        width: '100%',
      }}
    >
      <Button type={'button'} variant={'icon'}>
        <GoogleIcon style={{ height: 36, width: 36 }} />
      </Button>
      <Button type={'button'} variant={'icon'}>
        <GithubIcon style={{ height: 36, width: 36 }} />
      </Button>
    </div>
  )
}
