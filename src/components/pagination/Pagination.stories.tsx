import { useState } from 'react'

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
    setActivePage: (current: number) => console.log(current),
    setElemsOnPage: (value: string) => console.log(value),
    totalPages: 1,
  },
  render: args => {
    const totalPages = 1
    const [activePage, setActivePage] = useState(1)
    const [elemsOnPage, setElemsOnPage] = useState('10')

    return (
      <Pagination
        activePage={activePage}
        setActivePage={setActivePage}
        setElemsOnPage={setElemsOnPage}
        totalPages={totalPages}
      />
    )
  },
}
