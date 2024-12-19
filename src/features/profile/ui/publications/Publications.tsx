import { useState } from 'react'

import { ProfilePost } from '@/features/post/ui'
import { useGetPostsQuery } from '@/shared/api/post/post.api'
import { Post } from '@/shared/api/post/post.types'
import Image from 'next/image'

import s from './Publications.module.scss'

type PublicationsProps = {
  userId: string
}

export const Publications = ({ userId }: PublicationsProps) => {
  const { data } = useGetPostsQuery({ id: userId })
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [post, setPost] = useState<Post | null>(null)
  const handleOpenPost = (post: Post) => {
    setPost(post)
    setIsOpen(true)
  }

  return (
    <div className={s.publicationsContainer}>
      {data?.posts.map(post => (
        <div className={s.post} key={post.id} onClick={() => handleOpenPost(post)}>
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
      <ProfilePost isOpen={isOpen} onOpenChange={setIsOpen} post={post} userId={userId} />
    </div>
  )
}
