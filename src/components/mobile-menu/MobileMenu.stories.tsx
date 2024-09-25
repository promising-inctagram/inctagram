import { MobileMenu } from '@/components/mobile-menu/MobileMenu'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: MobileMenu,
  tags: ['autodocs'],
  title: 'components/MobileMenu',
} satisfies Meta<typeof MobileMenu>

export default meta
type Story = StoryObj<typeof MobileMenu>

export const MobileMenuBar: Story = {}
