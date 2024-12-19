export type CreatePostArgs = {
  agreement: boolean
  email: string
  password: string
  username: string
}

export type UpdatePostArgs = {
  description: string
  id: string
}

export type Images = {
  id: string
  mediumFilePath: string
  originFilePath: string
  smallFilePath: string
}

export type CreatePostResponse = {
  description: null | string
  id: string
  images: Images[]
}

export type GetPostsArgs = {
  cursor?: number
  id: string
}
export type ResponseGetPosts = {
  cursor: number
  posts: Post[]
}

export type Post = {
  description: string
  id: number
  images: Images[]
}
