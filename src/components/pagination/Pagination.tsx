import React from 'react'

import styles from './Pagination.module.scss'

import { Button } from '../button'
import { ArrowIosBackIcon, ArrowIosForwardIcon, MoreHorizontalIcon } from '../icons'
import { OptionsValue, Select } from '../select/Select'

export type PaginationProps = {
  activePage: number
  pages: number
  setActivePage: (current: number) => void
  setElemsOnPage: (value: string) => void
}

const selectItems: OptionsValue[] = [
  { value: '10' },
  { value: '20' },
  { value: '30' },
  { value: '50' },
  { value: '100' },
]

export const Pagination = (props: PaginationProps) => {
  const { activePage, pages, setActivePage, setElemsOnPage } = props

  const getPageNumbers = () => {
    const pageNumbers: number[] = []

    if (pages < 8) {
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i)
      }
    } else if (activePage < 5) {
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(i)
      }
      pageNumbers.push(0) //этот 0 заменяется на Многоточие
      pageNumbers.push(pages)
    } else if (activePage > pages - 4) {
      pageNumbers.push(1)
      pageNumbers.push(0) //этот 0 заменяется на Многоточие
      for (let i = pages - 4; i <= pages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)
      pageNumbers.push(0) //этот 0 заменяется на Многоточие
      for (let i = activePage - 1; i <= activePage + 1; i++) {
        pageNumbers.push(i)
      }
      pageNumbers.push(0) //этот 0 заменяется на Многоточие
      pageNumbers.push(pages)
    }

    return pageNumbers
  }

  const pageNumbersArr = getPageNumbers()

  return (
    <div className={styles.wrapper}>
      <Button className={styles.iconArrow} disabled={activePage === 1} variant={'icon'}>
        <ArrowIosBackIcon onClick={() => setActivePage(activePage - 1)} />
      </Button>
      {pageNumbersArr.map((elem, index) =>
        elem !== 0 ? (
          <button
            className={`${styles.elemPage} ${activePage === elem && styles.activePage}`}
            key={index}
            onClick={() => setActivePage(elem)}
            type={'button'}
          >
            {elem}
          </button>
        ) : (
          <MoreHorizontalIcon className={styles.icon} key={index} />
        )
      )}
      <Button
        className={styles.iconArrow}
        disabled={activePage === pages}
        style={{ marginLeft: '12px' }}
        variant={'icon'}
      >
        <ArrowIosForwardIcon onClick={() => setActivePage(activePage + 1)} />
      </Button>

      <div className={styles.container}>
        <span style={{ marginLeft: '24px', marginRight: '4px' }}>Show</span>
        <Select
          className={styles.select}
          defaultValue={selectItems[0].value}
          onValueChange={(value: string) => setElemsOnPage(value)}
          options={selectItems}
        />
        <span style={{ marginLeft: '7px' }}>on page</span>
      </div>
    </div>
  )
}
