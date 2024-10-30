import { useMeQuery } from '@/shared/api/auth/auth.api'
import AvatarEditor from '@/views/avatar-editor/ui/AvatarEditor'

import s from './GeneralPage.module.scss'
const GeneralPage = () => {
  const { data: userInfo } = useMeQuery()

  console.log(userInfo)
  const avatar = userInfo?.profile?.avatar?.originalUrl

  return (
    <>
      <main className={s.page}>
        <AvatarEditor />
        {/*todo: ProfileInfoForm*/}
      </main>
    </>
  )
}

export default GeneralPage
