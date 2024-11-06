import { Page, getSidebarLayout } from '@/components'
import { useMeQuery } from '@/shared/api/auth/auth.api'
import AvatarManager from '@/views/profile/ui/AvatarManager'

import s from './SettingsPage.module.scss'
function SettingsPage() {
  const { data } = useMeQuery()

  const avatar = data?.profile?.avatarInfo?.originFilePath

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
