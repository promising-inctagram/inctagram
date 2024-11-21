import { useContext } from 'react'

import { Page, getSidebarLayout } from '@/components'
import { AuthContext } from '@/shared/contexts'
import AvatarManager from '@/views/profile/avatar-manager/AvatarManager'

import s from './SettingsPage.module.scss'
const SettingsPage = () => {
  const { meData } = useContext(AuthContext)
  const avatar = meData?.profile?.avatarInfo?.originFilePath ?? ''

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
