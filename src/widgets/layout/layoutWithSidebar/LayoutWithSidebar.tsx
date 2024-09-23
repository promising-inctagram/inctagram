import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import s from './LayoutWithSidebar.module.scss'

export const LayoutWithSidebar: NextPage<PropsWithChildren> = ({ children }) => {
  return <div></div>
}
export const getLayoutWithSidebar = (page: ReactElement) => {
  return <LayoutWithSidebar>{page}</LayoutWithSidebar>
}
