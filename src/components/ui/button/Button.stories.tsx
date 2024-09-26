import type { Meta, StoryObj } from '@storybook/react'

import { FlagRussiaIcon, RadioButtonUncheckedIcon } from '@/components/ui/icons'

import { Button } from './Button'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'outlined', 'link', 'icon', 'language'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    as: 'button',
    children: 'Primary Button',
    disabled: false,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    as: 'button',
    children: 'Secondary Button',
    disabled: false,
    variant: 'secondary',
  },
}

export const Outlined: Story = {
  args: {
    as: 'button',
    children: 'Outlined Button',
    disabled: false,
    variant: 'outlined',
  },
}

export const Link: Story = {
  args: {
    as: 'button',
    children: 'Link Button',
    disabled: false,
    variant: 'link',
  },
}

export const Icon: Story = {
  args: {
    as: 'button',
    children: <RadioButtonUncheckedIcon />,
    disabled: false,
    variant: 'icon',
  },
}

export const FullWidth: Story = {
  args: {
    as: 'button',
    children: 'Full Width Primary Button',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}

export const Language: Story = {
  args: {
    as: 'button',
    children: (
      <>
        <FlagRussiaIcon />
        <span>English</span>
      </>
    ),
    disabled: false,
    variant: 'language',
  },
}
