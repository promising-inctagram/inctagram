import { Meta, StoryObj } from '@storybook/react'

import { Iconography } from './Iconography'
import {
  browserIconsList,
  flagsIconsList,
  iconsList,
  paymentsIconsList,
  socialNetworksIconsList,
} from './iconography.mock'

const meta = {
  argTypes: {},
  component: Iconography,
  title: 'Design System/Iconography',
} satisfies Meta<typeof Iconography>

export default meta
type Story = StoryObj<typeof meta>

export const Icons: Story = {
  args: { icons: iconsList },
}
export const Browsers: Story = {
  args: { icons: browserIconsList },
}

export const Flags: Story = {
  args: { icons: flagsIconsList },
}

export const Payments: Story = {
  args: { icons: paymentsIconsList },
}

export const SocialNetworks: Story = {
  args: { icons: socialNetworksIconsList },
}
