import { useGetPostsQuery } from '@/shared/api/post/post.api'
import Image from 'next/image'

import s from './Publications.module.scss'

type PublicationsProps = {
  userId: string
}

export const Publications = ({ userId }: PublicationsProps) => {
  const { data } = useGetPostsQuery({ id: userId })

  return (
    <div className={s.publicationsContainer}>
      {data?.posts.map(post => (
        <div className={s.post} key={post.id}>
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
