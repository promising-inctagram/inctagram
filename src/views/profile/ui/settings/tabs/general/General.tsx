import { useMeQuery } from '@/shared/api/auth/auth.api'
import ProfilePhoto from '@/views/profile/ui/ProfilePhoto'
import { SettingsForm } from '@/views/profile/ui/settings/tabs/general/SettingsForm'

import s from './General.module.scss'
export const GeneralInformation = () => {
  const { data: userInfo } = useMeQuery()

  const avatar = userInfo?.profile?.avatar?.originalUrl

  return (
    <div className={s.container}>
      <ProfilePhoto avatar={avatar} />
      <SettingsForm />
    </div>
  )
}
