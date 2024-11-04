import { getSidebarLayout } from '@/components/layout/sidebar-layout'
import { Page } from '@/components/page'
import { Button } from '@/components/ui/button'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'

function ProfilePage() {
  const { t } = useTranslation()

  return (
    <Page>
      Profile page
      <Button href={Paths.settings} variant={'secondary'}>
        {t.profilePage.profileSettingsBtn}
      </Button>
    </Page>
  )
}
ProfilePage.getLayout = getSidebarLayout
export default ProfilePage
