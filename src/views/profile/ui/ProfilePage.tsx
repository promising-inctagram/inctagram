import { Page, getSidebarLayout } from '@/components'
import { Button } from '@/components/ui/button'
import { Paths } from '@/shared/enums'
import { useRouter } from 'next/router'

function ProfilePage() {
  const {
    push,
    query: { id },
  } = useRouter()

  const openSettings = () => {
    push(`/${Paths.profile}/${id}/settings`)
  }

  return (
    <Page>
      Profile page
      <Button onClick={openSettings} variant={'link'}>
        profile settings
      </Button>
    </Page>
  )
}

ProfilePage.getLayout = getSidebarLayout
export default ProfilePage
