import { useContext } from 'react'

import { AuthContext } from '@/shared/contexts'
import AvatarManager from '@/views/profile/avatar-manager/ui/AvatarManager'
import { SettingsForm } from '@/views/profile/settings/ui/tabs/general/SettingsForm'

import s from './General.module.scss'
export const GeneralInformation = () => {
  const { meData } = useContext(AuthContext)

  if (!meData) {
    return
  }

  return (
    <div className={s.container}>
      <div className={s.avatarWrapper}>
        <AvatarManager
          avatar={meData.profile.avatarInfo ? meData.profile.avatarInfo.originFilePath : ''}
        />
      </div>
      <SettingsForm
        aboutMe={meData.profile.aboutMe}
        city={meData?.profile.city}
        country={meData?.profile.country}
        dateOfBirth={meData.profile.dateOfBirth}
        firstName={meData.profile.firstName}
        lastName={meData.profile.lastName}
        username={meData.username}
      />
    </div>
  )
}
