export type User = {
  createdAt: string
  email: string
  id: string
  nickname: string
  profile: {
    aboutMe: string
    avatar: {
      createdAt: string
      id: string
      originalUrl: string
      smallUrl: string
      updatedAt: string
    }
    city: string
    country: string
    dateOfBirth: string
    firstName: string
    lastName: string
  }
}
