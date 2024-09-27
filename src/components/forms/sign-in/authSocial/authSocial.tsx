import { Button } from '@/components/button'
import { GoogleIcon } from '@/components/icons'
import GithubIcon from '@/components/icons/social-networks/GithubIcon'

type Props = {}
export const AuthSocial = (props: Props) => {
  return (
    <div style={{ display: 'flex', height: '36px', margin: '12px 0 24px' }}>
      <Button type={'button'} variant={'icon'}>
        <GoogleIcon />
      </Button>
      <Button type={'button'} variant={'icon'}>
        <GithubIcon />
      </Button>
    </div>
  )
}
