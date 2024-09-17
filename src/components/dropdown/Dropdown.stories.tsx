import { Content, Item, Root, Trigger } from '@/components/dropdown/Dropdown'
import EditOutlineIcon from '@/components/icons/EditOutlineIcon'
import MoreHorizontalIcon from '@/components/icons/MoreHorizontalIcon'
import TrashOutlineIcon from '@/components/icons/TrashOutlineIcon'
import { Typography } from '@/components/typography'
import { Meta, StoryObj } from '@storybook/react'

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
