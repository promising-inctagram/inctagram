import { useEffect, useState } from 'react'

import { ProfilePost } from '@/features/post/ui'
import { Post } from '@/shared/api/post/post.types'
import { useIntersectionObserver } from '@uidotdev/usehooks'
import Image from 'next/image'

import s from './Publications.module.scss'

type PublicationsProps = {
  posts: Post[]
  updateCursor: () => void
  userId: string
}

export const Publications = ({ posts, updateCursor, userId }: PublicationsProps) => {
  const [isPostOpen, setIsPostOpen] = useState<boolean>(false)
  const [post, setPost] = useState<Post | null>(null)

  const [ref, entry] = useIntersectionObserver()

  useEffect(() => {
    // Когда последний элемент появляется в области видимости, обновляем курсор
    updateCursor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry?.isIntersecting])

  return (
    <div className={s.publicationsContainer}>
      {posts.map((post, index) => {
        const handleOpenPost = (post: Post) => {
          setPost(post)
          setIsPostOpen(true)
        }

        return (
          <div
            className={s.post}
            key={post.id}
            onClick={() => handleOpenPost(post)}
            ref={posts.length - 1 === index ? ref : null}
          >
            <Image
              alt={'Picture of the author'}
              fill
              sizes={'300px'}
              src={post.images[0]?.originFilePath ?? ''}
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        )
      })}
      {post?.id && (
        <ProfilePost
          isPostOpen={isPostOpen}
          postId={post?.id}
          setIsPostOpen={setIsPostOpen}
          userId={userId}
        />
      )}
    </div>
  )
}
