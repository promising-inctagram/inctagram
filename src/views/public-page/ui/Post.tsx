import React, { useState } from 'react'

import { Avatar, Carousel, Typography } from '@/components/ui'
import { UrlProfile } from '@/components/urlProfile'
import { useTranslation } from '@/shared/hooks'
import { PostType } from '@/shared/types/public-page/Posts'
import { TimeAgo } from '@/views/public-page/TimeAgo'
import clsx from 'clsx'

import s from './PublicPage.module.scss'

type Props = {
  post: PostType
}

export const Post = ({ post }: Props) => {
  const { t } = useTranslation()
  const { hide, showMore } = t.publicPage
  const [isExpanded, setIsExpanded] = useState(false)

  const handlerToggleText = () => {
    setIsExpanded(!isExpanded)
  }

  const minDescription = 60
  const maxDescription = 200

  const renderDescription = () => {
    if (isExpanded) {
      return (
        <>
          {post.description ? (
            <>
              {post.description.substring(0, maxDescription)}...{' '}
              <Typography
                as={'span'}
                className={s.showMore}
                onClick={handlerToggleText}
                variant={'regular_link'}
              >
                {hide}
              </Typography>
            </>
          ) : (
            <Typography as={'span'}>No description available</Typography>
          )}
        </>
      )
    }

    if (post.description) {
      if (post.description.length <= minDescription) {
        return post.description
      }
    }

    return (
      <>
        {post.description ? (
          <>
            {post.description.substring(0, minDescription)}...{' '}
            <Typography
              as={'span'}
              className={s.showMore}
              onClick={handlerToggleText}
              variant={'regular_link'}
            >
              {showMore}
            </Typography>
          </>
        ) : (
          <Typography as={'span'}>No description available</Typography>
        )}
      </>
    )
  }

  return (
    <article className={s.cardLink} key={post.id}>
      <a className={s.link} href={`/profile/${post.userInfo.id}/post/${post.id}`}></a>
      <div className={s.sliderContainer}>
        <Carousel minIcon slides={post.images} />
      </div>
      <div className={clsx(s.content, isExpanded && s.expanded)}>
        <UrlProfile
          src={post.userInfo.avatarInfo?.smallFilePath}
          userName={post.userInfo.firstName}
        />

        <Typography className={s.time} grey variant={'small_text'}>
          {TimeAgo('2024-10-15T12:00:00Z')}
        </Typography>
        <Typography className={s.descriptionContainer} variant={'regular_text_14'}>
          {renderDescription()}
        </Typography>
      </div>
    </article>
  )
}
