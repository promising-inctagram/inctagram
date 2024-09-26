import { PropsWithChildren } from 'react'

import { NextPage } from 'next'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header></header>
      {children}
    </>
  )
}
