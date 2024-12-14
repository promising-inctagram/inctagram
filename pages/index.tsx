import { getLayout } from '@/components'
import { CustomHead } from '@/shared/lib/CustomHead'
import { PostsData, PostsRes } from '@/shared/types/public-page/Posts'
import { CountUsersRes } from '@/shared/types/public-page/PublicPage'
import { CountUsers } from '@/views/public-page/ui/CountUsers'
import { Post } from '@/views/public-page/ui/Post'

export const getStaticProps = async () => {
  const postsResponse = await fetch('https://gateway.inctagram.world/api/v1/posts')
  const countUsersResponse = await fetch(
    'https://gateway.inctagram.world/api/v1/profile/user-count'
  )

  if (!postsResponse.ok) {
    return {
      notFound: true, // Если пост не найден, вернуть 404
    }
  }
  if (!countUsersResponse.ok) {
    return {
      notFound: true, // Если пост не найден, вернуть 404
    }
  }

  const postsData: PostsRes = await postsResponse.json()
  const countUsers: CountUsersRes = await countUsersResponse.json()

  return {
    props: {
      countUsers: countUsers.count,
      posts: postsData.posts,
    },
    revalidate: 60,
  }
}

type Props = {
  countUsers: number
  posts: PostsData
}

export default function Home({ countUsers, posts }: Props) {
  return (
    <>
      <CustomHead />
      <main className={'wrapper container'}>
        <CountUsers countUsers={countUsers} />
        <div className={'containerPosts'}>
          {posts?.map(post => {
            return <Post key={post.id} post={post} />
          })}
        </div>
      </main>
    </>
  )
}

Home.getLayout = getLayout
