import * as React from 'react'

import { getSidebarLayout } from '@/components/layout/sidebar-layout'
import { Page } from '@/components/page'
import { Button } from '@/components/ui/button'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import Link from 'next/link'

import s from './ProfilePage.module.scss'

const ProfilePage = () => {
  const { t } = useTranslation()
  const { profile_settings } = t.profile

  return (
    <Page mt={36}>
      <div className={s.btnContainer}>
        <Button as={Link} href={Paths.settings} variant={'secondary'}>
          {profile_settings}
        </Button>
      </div>
    </Page>
  )
}

ProfilePage.getLayout = getSidebarLayout
export default ProfilePage
