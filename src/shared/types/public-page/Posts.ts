import { StaticImageData } from 'next/image'

export type PostsRes = {
  cursor: number
  posts: PostsData
}
export type Image = {
  id: string
  mediumFilePath: string
  originFilePath: string
  smallFilePath: string
}

type AvatarInfo = {
  id: string
  mediumFilePath: string
  originFilePath: string
  smallFilePath: string
}

export type UserInfo = {
  avatarInfo: AvatarInfo
  firstName: string
  id: string
  lastName: string
}

export type PostType<T = UserInfo> = {
  description: string
  id: number
  images: Image[]
  userInfo: T
}

export type PostsData = PostType[]
