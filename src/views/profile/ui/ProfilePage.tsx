import { Page, getSidebarLayout } from '@/components'
import { Button } from '@/components/ui/button'
import { Paths, getProfileSettingsPath } from '@/shared/enums'
import { useRouter } from 'next/router'

function ProfilePage() {
  const {
    push,
    query: { id },
  } = useRouter()

  const openSettings = () => {
    if (typeof id === 'string') {
      // todo: Пока не знаю как лучше сделать
      push(getProfileSettingsPath(id))
    }
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
