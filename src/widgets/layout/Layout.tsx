import { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import s from './Layout.module.scss'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header></header>
      <main className={s.layout}>{children}</main>
    </>
  )
}
