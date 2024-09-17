import React from 'react'
import styles from './Pagination.module.scss'
import Link from 'next/link'

export type PaginationProps = {
  countElems: number
}

export const Pagination = (props: PaginationProps) => {
  const { countElems } = props
  
  return (
  <div className={styles.wrapper}>
    <Link href='d'>1</Link>
  </div>
  )
}
