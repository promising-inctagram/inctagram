import React from 'react'

import { Button, Item } from '@/components/ui'
import { DropDownMenu } from '@/components/ui/dropdown/DropDownMenu'
import { EditOutlineIcon, MoreHorizontalIcon, TrashOutlineIcon } from '@/components/ui/icons'
import { useTranslation } from '@/shared/hooks'

import s from './PostDropDownMeny.module.scss'

type PostDropDownMenuProps = {
  handleCloseModal: (value: boolean) => void
  handleEditModal: () => void
}

export const PostDropDownMenu = ({ handleCloseModal, handleEditModal }: PostDropDownMenuProps) => {
  const { t } = useTranslation()
  const { deletePost, editPost } = t.profilePost.postDropDownMenu

  return (
    <DropDownMenu trigger={<MoreHorizontalIcon />}>
      <Item>
        <Button className={s.dropDownButton} onClick={handleEditModal} variant={'icon'}>
          <EditOutlineIcon />
          {editPost}
        </Button>
      </Item>
      <Item>
        <Button className={s.dropDownButton} onClick={handleCloseModal} variant={'icon'}>
          <TrashOutlineIcon />
          {deletePost}
        </Button>
      </Item>
    </DropDownMenu>
  )
}
