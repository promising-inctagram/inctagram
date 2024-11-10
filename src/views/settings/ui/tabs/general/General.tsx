import { useMeQuery } from '@/shared/api/auth/auth.api'
import { SettingsForm } from '@/views/settings/ui/tabs/general/SettingsForm'

import s from './General.module.scss'
export const GeneralInformation = () => {
  const { data: userInfo } = useMeQuery()

  const avatar = userInfo?.profile?.avatarInfo?.originFilePath
  const username = userInfo?.username

  return (
    <div className={s.container}>
      <div style={{ width: '200px' }}>add a profile photo</div>
      <SettingsForm username={username} />
    </div>
  )
}
