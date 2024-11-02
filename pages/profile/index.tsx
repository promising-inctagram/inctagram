import { Page, getSidebarLayout } from '@/components'
import { Button } from '@/components/ui/button'
import { Paths } from '@/shared/enums'
import { useRouter } from 'next/router'

import General from './settings'

function ProfilePage() {
  const { push } = useRouter()

  return (
    <Page>
      Profile page
      <Button onClick={() => push(Paths.profileSettings)} variant={'link'}>
        profile settings
      </Button>
    </Page>
  )
}

ProfilePage.getLayout = getSidebarLayout
export default ProfilePage
