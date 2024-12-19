import React, { useState } from 'react'

import { Button, Item } from '@/components/ui'
import { DropDownMenu } from '@/components/ui/dropdown/DropDownMenu'
import { EditOutlineIcon, MoreHorizontalIcon, TrashOutlineIcon } from '@/components/ui/icons'

import s from './PostDropDownMeny.module.scss'

import { PostCloseModal } from '../PostCloseModal'

type PostDropDownMenuProps = {
  handleCloseModal: (value: boolean) => void
}

export const PostDropDownMenu = ({ handleCloseModal }: PostDropDownMenuProps) => {
  return (
    <DropDownMenu trigger={<MoreHorizontalIcon />}>
      <Item>
        <Button className={s.dropDownButton} variant={'icon'}>
          <EditOutlineIcon />
          Edit Post
        </Button>
      </Item>
      <Item>
        <Button className={s.dropDownButton} onClick={handleCloseModal} variant={'icon'}>
          <TrashOutlineIcon />
          Delete Post
        </Button>
      </Item>
    </DropDownMenu>
  )
}
