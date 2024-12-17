import { useContext } from 'react'

import { getSidebarLayout } from '@/components'
import { AuthContext } from '@/shared/contexts'
import { PostType } from '@/shared/types/public-page/Posts'
import { User } from '@/shared/types/public-page/User'
import ProfilePage from '@/views/profile/ProfilePage'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

import Post from './post/[postId]'

export const getServerSideProps = async (context: NextPageContext) => {
  const { id, postId } = context.query

  const profileResponse = await fetch(`https://gateway.inctagram.world/api/v1/profile/${id}`)

  if (!profileResponse.ok) {
    return {
      notFound: true, // Если профиль не найден, вернуть 404
    }
  }
  const profile = await profileResponse.json()

  return {
    props: {
      profile,
    },
  }
}

type Props = {
  post: PostType<{}>
  profile: User
}

const Profile = ({ profile }: Props) => {
  const { isAuth } = useContext(AuthContext)
  const router = useRouter()
  const { postId } = router.query

  return <ProfilePage isAuth={isAuth} postId={postId} profile={profile} />
}

Profile.getLayout = getSidebarLayout
export default Profile
/*export const getServerSideProps = async (context: NextPageContext) => {
  const { id, postId } = context.query

  const profileResponse = await fetch(`https://gateway.inctagram.world/api/v1/profile/${id}`)
  const postResponse = await fetch(`https://gateway.inctagram.world/api/v1/posts/${postId}`)

  if (!profileResponse.ok) {
    return {
      notFound: true, // Если профиль не найден, вернуть 404
    }
  }
  if (!postResponse.ok) {
    return {
      notFound: true, // Если пост не найден, вернуть 404
    }
  }
  const profile = await profileResponse.json()
  const post = await postResponse.json()

  return {
    props: {
      post,
      profile,
    },
  }
}

type Props = {
  post: PostType<{}>
  profile: User
}*/
