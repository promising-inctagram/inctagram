import { Card } from '@/components/card'
import { TextField } from '@/components/text-field'
import { Typography } from '@/components/typography'

type Props = {}
export const SignInForm = (props: Props) => {
  return (
    <Card>
      <Typography>Sign In</Typography>
      <form>
        <TextField variant={'text'} />
      </form>
    </Card>
  )
}
