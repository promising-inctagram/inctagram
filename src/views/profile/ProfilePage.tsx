import { useEffect, useState } from 'react'

import { getSidebarLayout } from '@/components/layout/sidebar-layout'
import { Page } from '@/components/page'
import { ProfileHeader } from '@/features/profile/ui/header'
import { Publications } from '@/features/profile/ui/publications'
import { useRouter } from 'next/router'

import s from './ProfilePage.module.scss'

const ProfilePage = () => {
  const router = useRouter()
  const [userId, setUserId] = useState('')

  useEffect(() => {
    if (router.query.id) {
      const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id

      setUserId(id)
    }
  }, [router.query.id])

  if (!userId) {
    return null
  }

  return (
    <Page pt={36}>
      <div className={s.container}>
        <ProfileHeader className={s.header} userId={userId} />
        <Publications userId={userId} />
      </div>
    </Page>
  )
}

ProfilePage.getLayout = getSidebarLayout
export default ProfilePage
