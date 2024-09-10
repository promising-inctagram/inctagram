import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './'

const meta = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            options: ['primary', 'secondary', 'outlined', 'text'],
            control: { type: 'radio' },
        },
    },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Primary Button',
        disabled: false,
    },
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Secondary Button',
        disabled: false,
    },
}

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        children: 'Outlined Button',
        disabled: false,
    },
}

export const Text: Story = {
    args: {
        variant: 'text',
        children: 'Text Button',
        disabled: false,
    },
}

export const FullWidth: Story = {
    args: {
        variant: 'primary',
        children: 'Full Width Primary Button',
        disabled: false,
        fullWidth: true,
    },
}

