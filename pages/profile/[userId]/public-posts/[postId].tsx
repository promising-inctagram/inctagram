import { getLayout } from '@/components'
import { Card, Carousel } from '@/components/ui'
import { Post } from '@/shared/types/public-page/Posts'
import { User } from '@/shared/types/public-page/User'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'

import PublicProfilePage from '../index'

export const getServerSideProps: GetServerSideProps<{
  post: Post<{}>
  profile: User
}> = async context => {
  const { postId, userId } = context.params as { postId: string; userId: string }

  const profileResponse = await fetch(`https://gateway.inctagram.world/api/v1/profile/${userId}`)
  const postResponse = await fetch(`https://gateway.inctagram.world/api/v1/posts/${postId}`)

  /*if (!profileResponse.ok) {
            return {
              notFound: true, // Если профиль не найден, вернуть 404
            }
          }*/
  /*if (!postResponse.ok) {
           return {
             notFound: true, // Если пост не найден, вернуть 404
           }
         }*/
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
  post: Post<{}>
  profile: User
}

function PostModal({ post, profile }: Props) {
  const router = useRouter()

  const closeHandler = () => {
    router.push(`/profile/${profile.id}`)
  }

  return (
    <div>
      <Card
        onClick={closeHandler}
        style={{ position: 'absolute', right: '50%', top: '50%', zIndex: 1 }}
      >
        <Carousel slides={post.images} />
        <p>{post.id}</p>
        <p>{post.description}</p>
      </Card>
    </div>
  )
}

PostModal.getLayout = getLayout
export default PostModal
