import { Post, PostsData } from '@/shared/types/public-page/Posts'
import Link from 'next/link'

type Props = {
  posts: PostsData
}
export const Posts = ({ posts }: Props) => {
  return (
    <article>
      {posts.map((post: Post) => {
        return (
          <Link href={`/profile?userId=${post.userInfo.id}&postId=${post.id}`} key={post.id}>
            <div>
              <p>{post.userInfo.firstName}</p>
            </div>
          </Link>
        )
      })}
    </article>
  )
}
