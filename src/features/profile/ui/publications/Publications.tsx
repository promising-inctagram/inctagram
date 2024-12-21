import { useEffect } from 'react'

import { Post } from '@/shared/api/post/post.types'
import { useIntersectionObserver } from '@uidotdev/usehooks'
import Image from 'next/image'

import s from './Publications.module.scss'

type PublicationsProps = {
  posts: Post[]
  updateCursor: () => void
}

export const Publications = ({ posts, updateCursor }: PublicationsProps) => {
  const [ref, entry] = useIntersectionObserver()

  useEffect(() => {
    // Когда последний элемент появляется в области видимости, обновляем курсор
    updateCursor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry?.isIntersecting])

  return (
    <div className={s.publicationsContainer}>
      {posts.map((post, index) => (
        <div className={s.post} key={post.id} ref={posts.length - 1 === index ? ref : null}>
          <Image
            alt={'Picture of the author'}
            fill
            sizes={'300px'}
            src={post.images[0].originFilePath ?? ''}
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      ))}
    </div>
  )
}
