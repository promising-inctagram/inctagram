import { useContext } from 'react'

import { AuthContext } from '@/shared/contexts'
import { SettingsForm } from '@/views/settings/ui/tabs/general/SettingsForm'

import s from './General.module.scss'
export const GeneralInformation = () => {
  const { meData } = useContext(AuthContext)

  if (!meData) {
    return
  }

  return (
    <div className={s.container}>
      <div style={{ width: '200px' }}>add a profile photo</div>
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
