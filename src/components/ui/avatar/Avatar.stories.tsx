import { Avatar } from '@/components/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    size: {
      options: ['l', 'm', 's', 'xs'],
    },
  },
  component: Avatar,
  tags: ['autodocs'],
  title: 'Components/Avatar',
} satisfies Meta<typeof Avatar>

export default meta
export type Story = StoryObj<typeof meta>

export const DefaultExtraSmall: Story = {
  args: {
    size: 'xs',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm-P8bA7CjEhkhrfV_4YB-nrGOFRs0gB4OOw&usqp=CAU',
    userName: 'User',
  },
}

export const DefaultSmall: Story = {
  args: {
    size: 's',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm-P8bA7CjEhkhrfV_4YB-nrGOFRs0gB4OOw&usqp=CAU',
    userName: 'User',
  },
}

export const DefaultMedium: Story = {
  args: {
    size: 'm',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm-P8bA7CjEhkhrfV_4YB-nrGOFRs0gB4OOw&usqp=CAU',
    userName: 'User',
  },
}
export const DefaultLarge: Story = {
  args: {
    size: 'l',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm-P8bA7CjEhkhrfV_4YB-nrGOFRs0gB4OOw&usqp=CAU',
    userName: 'User',
  },
}

export const WithoutUserPhoto: Story = {
  args: {
    userName: 'User',
  },
}
