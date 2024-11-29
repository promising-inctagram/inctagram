import { getLayout } from '@/components'
import { User } from '@/shared/types/public-page/User'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps<{ profile: User }> = async context => {
  const { userId } = context.params as { userId: string }

  const profileResponse = await fetch(`https://gateway.inctagram.world/api/v1/profile/${userId}`)
  const profile = await profileResponse.json()

  return {
    props: {
      profile,
    },
  }
}

type Props = {
  profile: User
}

function PublicProfilePage({ profile }: Props) {
  const router = useRouter()

  return <div>{profile.username}</div>
}

PublicProfilePage.getLayout = getLayout
export default PublicProfilePage
