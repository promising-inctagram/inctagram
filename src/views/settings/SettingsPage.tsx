import { Page, getSidebarLayout } from '@/components'
import { useMeQuery } from '@/shared/api/auth/auth.api'
import { useTranslation } from '@/shared/hooks'
import AvatarManager from '@/views/profile/ui/AvatarManager'

import s from './SettingsPage.module.scss'
function SettingsPage() {
  const { t } = useTranslation()
  const { data: userInfo } = useMeQuery()

  console.log(userInfo)
  const avatar = userInfo?.profile?.avatar?.originalUrl

  return (
    <Page>
      <div className={s.container}>
        <AvatarManager avatar={avatar} />
        {/*todo: ProfileInfoForm*/}
      </div>
    </Page>
  )
}
SettingsPage.getLayout = getSidebarLayout
export default SettingsPage
