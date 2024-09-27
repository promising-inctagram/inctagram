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
    pageSize: '10',
    setActivePage: () => {},
    setPageSize: () => {},
    totalCount: 100,
  },
  render: args => {
    const totalCount = 100
    const [activePage, setActivePage] = useState(1)
    const [pageSize, setPageSize] = useState('10')

    return (
      <Pagination
        activePage={activePage}
        pageSize={pageSize}
        setActivePage={setActivePage}
        setPageSize={setPageSize}
        totalCount={totalCount}
      />
    )
  },
}
