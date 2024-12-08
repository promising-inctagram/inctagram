import dummyImage2 from '@/assets/webp/Mask group.png'
import dummyImage from '@/assets/webp/dummy-image.webp'
import { Carousel } from '@/components/ui'
import { Post, PostsData } from '@/shared/types/public-page/Posts'
import Link from 'next/link'
type Props = {
  posts: PostsData
}
export const Posts = ({ posts }: Props) => {
  const slides = [dummyImage, dummyImage2]

  return (
    <article>
      {posts.map((post: Post) => {
        return (
          <Link href={`/profile?userId=${post.userInfo.id}&postId=${post.id}`} key={post.id}>
            <Carousel slides={post.images} />
            <div>
              <p>{post.userInfo.firstName}</p>
            </div>
          </Link>
        )
      })}
    </article>
  )
}
