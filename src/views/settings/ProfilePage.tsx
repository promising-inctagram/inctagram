import { Page, getSidebarLayout } from '@/components'
import { Button } from '@/components/ui/button'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import link from 'next/link'
function ProfilePage() {
  const { t } = useTranslation()

  return (
    <Page>
      Profile page
      <Button as={link} href={Paths.settings} variant={'secondary'}>
        {t.profile.profile_settings}
      </Button>
    </Page>
  )
}

ProfilePage.getLayout = getSidebarLayout
export default ProfilePage