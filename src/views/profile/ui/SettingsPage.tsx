import { Page, getSidebarLayout } from '@/components'
import { useMeQuery } from '@/shared/api/auth/auth.api'
import ProfilePhoto from '@/views/profile/ui/ProfilePhoto'

import s from './SettingsPage.module.scss'
function SettingsPage() {
  const { data: userInfo } = useMeQuery()

  console.log(userInfo)
  const avatar = userInfo?.profile?.avatar?.originalUrl

  return (
    <Page>
      <div className={s.container}>
        <ProfilePhoto avatar={avatar} />
        {/*todo: ProfileInfoForm*/}
      </div>
    </Page>
  )
}
SettingsPage.getLayout = getSidebarLayout
export default SettingsPage
