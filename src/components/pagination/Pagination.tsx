import React from 'react'

import clsx from 'clsx'

import styles from './Pagination.module.scss'

import { Button } from '../button'
import { ArrowIosBackIcon, ArrowIosForwardIcon, MoreHorizontalIcon } from '../icons'
import { OptionsValue, Select } from '../select/Select'
import { Typography } from '../typography'

export type PaginationProps = {
  activePage: number
  pageSize: string
  setActivePage: (current: number) => void
  setPageSize: (value: string) => void
  totalCount: number
}

const selectItems: OptionsValue[] = [
  { value: '10' },
  { value: '20' },
  { value: '30' },
  { value: '50' },
  { value: '100' },
]

const getPageNumbers = (totalPages: number, activePage: number) => {
  const pageNumbers: number[] = []

  if (totalPages < 8) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  } else if (activePage < 5) {
    for (let i = 1; i <= 5; i++) {
      pageNumbers.push(i)
    }
    pageNumbers.push(0) //этот 0 заменяется на Многоточие
    pageNumbers.push(totalPages)
  } else if (activePage > totalPages - 4) {
    pageNumbers.push(1)
    pageNumbers.push(0) //этот 0 заменяется на Многоточие
    for (let i = totalPages - 4; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  } else {
    pageNumbers.push(1)
    pageNumbers.push(0) //этот 0 заменяется на Многоточие
    for (let i = activePage - 1; i <= activePage + 1; i++) {
      pageNumbers.push(i)
    }
    pageNumbers.push(0) //этот 0 заменяется на Многоточие
    pageNumbers.push(totalPages)
  }

  return pageNumbers
}

export const Pagination = (props: PaginationProps) => {
  const { activePage, pageSize, setActivePage, setPageSize, totalCount } = props
  const totalPages = Math.ceil(totalCount / Number(pageSize)) //Привожу к number тк в селекте option использует string => и я использую string

  const incrementPage = () => {
    setActivePage(activePage + 1)
  }
  const decrementPage = () => {
    setActivePage(activePage - 1)
  }

  const pageNumbersArr = getPageNumbers(totalPages, activePage)

  return (
    <div className={styles.wrapper}>
      {totalPages > 1 && (
        <div className={styles.containerPages}>
          <Button className={styles.iconArrow} disabled={activePage === 1} variant={'icon'}>
            <ArrowIosBackIcon onClick={decrementPage} />
          </Button>
          {pageNumbersArr.map((elem, index) =>
            elem !== 0 ? (
              <Button
                className={clsx(styles.elemPage, activePage === elem && styles.activePage)}
                key={`page-${elem}-${index}`}
                onClick={() => setActivePage(elem)}
                variant={'secondary'}
              >
                {elem}
              </Button>
            ) : (
              <MoreHorizontalIcon className={styles.icon} key={`ellipsis-${elem}-${index}`} />
            )
          )}
          <Button
            className={styles.iconArrow}
            disabled={activePage === totalPages}
            variant={'icon'}
          >
            <ArrowIosForwardIcon onClick={incrementPage} />
          </Button>
        </div>
      )}

      <div className={styles.container}>
        <Typography variant={'regular_text_14'}>Show</Typography>
        <div className={styles.selectContainer}>
          <Select
            defaultValue={selectItems[0].value}
            onValueChange={(value: string) => setPageSize(value)}
            options={selectItems}
          />
        </div>
        <Typography variant={'regular_text_14'}>on page</Typography>
      </div>
    </div>
  )
}
