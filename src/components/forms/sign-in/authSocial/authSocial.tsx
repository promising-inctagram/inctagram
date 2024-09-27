import { Button } from '@/components/button'
import { GoogleIcon } from '@/components/icons'
import GithubIcon from '@/components/icons/social-networks/GithubIcon'

type Props = {}
export const AuthSocial = (props: Props) => {
  return (
    <div>
      <Button type={'button'} variant={'icon'}>
        <GoogleIcon />
      </Button>
      <Button type={'button'} variant={'icon'}>
        <GithubIcon />
      </Button>
    </div>
  )
}
