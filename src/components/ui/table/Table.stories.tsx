import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'

import './freestyle.scss'

const meta = {
  argTypes: {
    className: { control: 'text' },
  },
  component: Table,
  tags: ['autodocs'],
  title: 'Components/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const tableData = [
  {
    date: '12.12.2022',
    endDate: '12.12.2022',
    payment: 'Stripe',
    price: '$10',
    subscription: '1 day',
  },
  {
    date: '12.12.2022',
    endDate: '12.12.2022',
    payment: 'Stripe',
    price: '$50',
    subscription: '7 days',
  },
  {
    date: '12.12.2022',
    endDate: '12.12.2022',
    payment: 'Stripe',
    price: '$100',
    subscription: '1 month',
  },
  {
    date: '12.12.2022',
    endDate: '12.12.2022',
    payment: 'PayPal',
    price: '$100',
    subscription: '1 month',
  },
  {
    date: '12.12.2022',
    endDate: '12.12.2022',
    payment: 'PayPal',
    price: '$50',
    subscription: '7 days',
  },
  {
    date: '12.12.2022',
    endDate: '12.12.2022',
    payment: 'PayPal',
    price: '$50',
    subscription: '7 days',
  },
  {
    date: '12.12.2022',
    endDate: '12.12.2022',
    payment: 'PayPal',
    price: '$50',
    subscription: '7 days',
  },
  {
    date: '12.12.2022',
    endDate: '12.12.2022',
    payment: 'PayPal',
    price: '$100',
    subscription: '1 month',
  },
]

export const Default: Story = {
  args: {
    className: 'custom-table',
  },
  render: args => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Date of Payment</TableHead>
          <TableHead>End date of subscription</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Subscription Type</TableHead>
          <TableHead>Payment Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.endDate}</TableCell>
            <TableCell>{row.price}</TableCell>
            <TableCell>{row.subscription}</TableCell>
            <TableCell>{row.payment}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const Selected: Story = {
  args: {
    className: 'custom-table',
  },
  render: args => {
    const [selectedRowIndex, setSelectedRowIndex] = useState<null | number>(null)
    const handleRowClick = (index: number) => {
      setSelectedRowIndex(index)
    }

    return (
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead>Date of Payment</TableHead>
            <TableHead>End date of subscription</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Subscription Type</TableHead>
            <TableHead>Payment Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow
              className={index === selectedRowIndex ? 'selected' : ''}
              key={index}
              onClick={() => handleRowClick(index)}
            >
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.endDate}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.subscription}</TableCell>
              <TableCell>{row.payment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  },
}
