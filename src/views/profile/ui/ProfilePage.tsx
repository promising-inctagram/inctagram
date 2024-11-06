import { useContext } from 'react'

import { getSidebarLayout } from '@/components/layout/sidebar-layout'
import { Page } from '@/components/page'
import { Button } from '@/components/ui/button'
import { AuthContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'

function ProfilePage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { isAuth, meData } = useContext(AuthContext)

  return (
    <Page>
      {isAuth && (
        <Button as={Link} href={Paths.settings} variant={'secondary'}>
          {t.profilePage.profileSettingsBtn}
        </Button>
      )}
    </Page>
  )
}
ProfilePage.getLayout = getSidebarLayout
export default ProfilePage
