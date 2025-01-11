import React from 'react'

import { Button, Item } from '@/components/ui'
import { DropDownMenu } from '@/components/ui/dropdown/DropDownMenu'
import { EditOutlineIcon, MoreHorizontalIcon, TrashOutlineIcon } from '@/components/ui/icons'
import { useTranslation } from '@/shared/hooks'

import s from './PostDropDownMeny.module.scss'

type PostDropDownMenuProps = {
  toggleConfirmDeleteModal: (value: boolean) => void
  toggleEditPostModal: () => void
}

export const PostDropDownMenu = ({
  toggleConfirmDeleteModal,
  toggleEditPostModal,
}: PostDropDownMenuProps) => {
  const { t } = useTranslation()
  const { deletePostButton, editPostButton } = t.profilePost.postDropDownMenu

  return (
    <DropDownMenu trigger={<MoreHorizontalIcon />}>
      <Item>
        <Button className={s.dropDownButton} onClick={toggleEditPostModal} variant={'icon'}>
          <EditOutlineIcon />
          {editPostButton}
        </Button>
      </Item>
      <Item>
        <Button className={s.dropDownButton} onClick={toggleConfirmDeleteModal} variant={'icon'}>
          <TrashOutlineIcon />
          {deletePostButton}
        </Button>
      </Item>
    </DropDownMenu>
  )
}
