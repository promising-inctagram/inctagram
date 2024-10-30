import { useState } from 'react'

import { Avatar } from '@/components/ui/avatar'
import { BlankImage } from '@/components/ui/blankImage'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/shared/hooks'

import s from './AvatarEditor.module.scss'
type Props = { avatar?: null | string }
const AvatarEditor = ({ avatar }: Props) => {
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const openAddPhotoModalHandler = () => {}
  const openDeletePhotoModalHandler = () => {}

  return (
    <>
      <div className={s.root}>
        {avatar ? <Avatar size={'s'} src={avatar} userName={'userAvatar'} /> : <BlankImage />}
        <Button onClick={openAddPhotoModalHandler} variant={'outlined'}>
          {t.profileSettingPage.avatarEditor.addProfilePhoto}
        </Button>
      </div>
    </>
  )
}

export default AvatarEditor
