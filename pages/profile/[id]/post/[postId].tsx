import { useEffect, useState } from 'react'

import { getSidebarLayout } from '@/components'
import { PostType } from '@/shared/types/public-page/Posts'
import { User } from '@/shared/types/public-page/User'
import { PostModal } from '@/views/profile/PostModal'
import ProfilePage from '@/views/profile/ProfilePage'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
export const getServerSideProps = async (context: NextPageContext) => {
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
}
const Post = ({ post, profile }: Props) => {
  const router = useRouter()
  const { postId } = router.query

  return <ProfilePage isAuth={false} post={post} postId={postId} profile={profile} />
}

Post.getLayout = getSidebarLayout
export default Post
