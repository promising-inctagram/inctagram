import { useContext } from 'react'

import { getLayout } from '@/components'
import { useMeQuery } from '@/shared/api/auth/auth.api'
import { AuthContext } from '@/shared/contexts'
import { PostType } from '@/shared/types/public-page/Posts'
import { User } from '@/shared/types/public-page/User'
import ProfilePage from '@/views/profile/my-profile/ProfilePage'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

export const getServerSideProps = async (context: NextPageContext) => {
  const { postId, userId } = context.query

  const profileResponse = await fetch(`https://gateway.inctagram.world/api/v1/profile/${userId}`)
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

function Profile({ post, profile }: Props) {
  const { isAuth } = useContext(AuthContext)

  console.log(isAuth)

  return (
    /* <div>
               <Card
                 onClick={closeHandler}
                 style={{ position: 'absolute', right: '50%', top: '50%', zIndex: 1 }}
               >
                 <Carousel slides={post.images} />
                 <p>{post.id}</p>
                 <p>{post.description}</p>
               </Card>
             </div>*/
    <ProfilePage isAuth={isAuth} post={post} profile={profile} />
  )
}

Profile.getLayout = getLayout
export default Profile
