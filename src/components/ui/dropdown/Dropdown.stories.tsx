import * as React from 'react'

import { DropDownMenu } from '@/components/ui/dropdown/DropDownMenu'
import { DropDownSubMenu } from '@/components/ui/dropdown/DropDownSubMenu'
import { Item } from '@/components/ui/dropdown/DropdownItem'
import EditOutlineIcon from '@/components/ui/icons/EditOutlineIcon'
import MoreHorizontalIcon from '@/components/ui/icons/MoreHorizontalIcon'
import TrashOutlineIcon from '@/components/ui/icons/TrashOutlineIcon'
import { Meta, StoryObj } from '@storybook/react'

import s from '@/components/ui/dropdown/Dropdown.module.scss'

import { Button } from '../button'
import { Typography } from '../typography'

const meta = {
  component: DropDownMenu,
  tags: ['autodocs'],
  title: 'components/Dropdown',
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof DropDownMenu>

export const DropdownMenu = {
  render: () => {
    return (
      <DropDownMenu trigger={<MoreHorizontalIcon />}>
        <Item>
          <Button variant={'icon'}>
            <EditOutlineIcon />
            <Typography as={'span'}>Edit Post</Typography>
          </Button>
        </Item>
        <Item>
          <Button variant={'icon'}>
            <TrashOutlineIcon />
            <Typography as={'span'}>Delete Post</Typography>
          </Button>
        </Item>
      </DropDownMenu>
    )
  },
}
export const DropdownWithSubMenu = {
  render: () => {
    return (
      <DropDownMenu trigger={<MoreHorizontalIcon />}>
        <Item>
          <Button variant={'icon'}>
            <EditOutlineIcon />
            <Typography as={'span'}>Edit Post</Typography>
          </Button>
        </Item>
        <Item>
          <Button variant={'icon'}>
            <TrashOutlineIcon />
            <Typography as={'span'}>Delete Post</Typography>
          </Button>
        </Item>
        <DropDownSubMenu title={'More information'} trigger={<MoreHorizontalIcon />}>
          <Item>
            <Typography as={'span'} style={{ padding: '12px' }}>
              Hi
            </Typography>
          </Item>
          <Item>
            <Typography as={'span'} style={{ padding: '12px' }}>
              Hi
            </Typography>
          </Item>
          <Item>
            <Typography as={'span'} style={{ padding: '12px' }}>
              Hi
            </Typography>
          </Item>
        </DropDownSubMenu>
      </DropDownMenu>
    )
  },
}
