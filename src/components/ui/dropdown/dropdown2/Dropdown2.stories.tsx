import { Content, Item, Root, Trigger } from '@/components/ui/dropdown/dropdown2/Dropdown2'
import EditOutlineIcon from '@/components/ui/icons/EditOutlineIcon'
import MoreHorizontalIcon from '@/components/ui/icons/MoreHorizontalIcon'
import TrashOutlineIcon from '@/components/ui/icons/TrashOutlineIcon'
import { Meta, StoryObj } from '@storybook/react'

import { Typography } from '../../typography'

const meta = {
  component: Root,
  tags: ['autodocs'],
  title: 'components/Dropdown',
} satisfies Meta<typeof Root>

export default meta
type Story = StoryObj<typeof Root>
export const Dropdown = {
  render: () => {
    return (
      <Root>
        <Trigger>
          <MoreHorizontalIcon />
        </Trigger>
        <Content>
          <Item>
            <div>
              <EditOutlineIcon />
              <Typography as={'span'}>Edit Post</Typography>
            </div>
          </Item>
          <Item>
            <div>
              <TrashOutlineIcon />
              <Typography as={'span'}>Delete Post</Typography>
            </div>
          </Item>
        </Content>
      </Root>
    )
  },
}
