import { useEffect, useRef, useState } from 'react'

import { getSidebarLayout } from '@/components/layout/sidebar-layout'
import { Page } from '@/components/page'
import { ProfileHeader } from '@/features/profile/ui/header'
import { Publications } from '@/features/profile/ui/publications'
import { useMeQuery } from '@/shared/api/auth/auth.api'
import { useGetPostsQuery } from '@/shared/api/post/post.api'
import { Post } from '@/shared/api/post/post.types'
import { useRouter } from 'next/router'

import s from './ProfilePage.module.scss'

const ProfilePage = () => {
  const router = useRouter()
  const [userId, setUserId] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [cursor, setCursor] = useState<number>()
  const requestIdRef = useRef<string[]>([])
  const { data: me } = useMeQuery()

  const { data, isSuccess, requestId } = useGetPostsQuery(
    { cursor: cursor, id: userId },
    { skip: !userId }
  )

  useEffect(() => {
    if (router.query.id && me) {
      const id = Array.isArray(router.query.id) ? router.query.id[0] : me.id

      setUserId(id)
      router.push(`/profile/${me.id}`)
    }
  }, [router.query.id, me])

  useEffect(() => {
    // Выходим если запрос за постами не успешен
    if (!isSuccess || !data || !requestId) {
      return
    }

    // Добавляем посты в стейт только если это новый запрос.
    if (!requestIdRef.current.includes(requestId)) {
      requestIdRef.current.push(requestId)
      if (data.posts.length > 0) {
        setPosts(prevPosts => [...prevPosts, ...data.posts])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  if (!userId) {
    return null
  }

  const updateCursor = () => {
    if (data?.cursor !== 0) {
      setCursor(data?.cursor)
    }
  }

  return (
    <Page pt={36}>
      <div className={s.container}>
        <ProfileHeader className={s.header} userId={userId} />
        <Publications posts={posts} updateCursor={updateCursor} userId={userId} />
      </div>
    </Page>
  )
}

ProfilePage.getLayout = getSidebarLayout
export default ProfilePage
