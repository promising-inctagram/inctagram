import { useState } from 'react'
import { render } from 'react-dom'

import { StoryObj } from '@storybook/react'

import { Pagination } from './Pagination'

const meta = {
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    activePage: 1,
    pages: 55,
    setActivePage: (current: number) => console.log(current),
    setElemsOnPage: (value: string) => console.log(value),
  },
  render: args => {
    const pages = 55
    const [activePage, setActivePage] = useState(1)
    const [elemsOnPage, setElemsOnPage] = useState('10')

    return (
      <Pagination
        activePage={activePage}
        pages={pages}
        setActivePage={setActivePage}
        setElemsOnPage={setElemsOnPage}
      />
    )
  },
}
