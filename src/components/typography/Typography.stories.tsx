import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './Typography'

const text = `В туманном лесу, где свет пробивается сквозь густые ветви деревьев, маленькая 
сова сидела на ветке, наблюдая за миром. Она думала о том, как быстро летит время, 
и о своих ночных приключениях. Вдруг раздался треск, и из кустов выскочила лиса, 
ее рыжая шкура ярко выделялась на фоне зелени. Сова, взмахнув крыльями, поднялась в воздух, 
оставляя за собой шлейф из мелких звезд.`

const meta = {
  argTypes: {
    variant: {
      options: [
        'large',
        'h1',
        'h2',
        'h3',
        'regular_text_16',
        'bold_text_16',
        'regular_text_14',
        'medium_text_14',
        'bold_text_14',
        'small_text',
        'semi-bold_small_text',
        'regular_link',
        'small_link',
      ],
    },
  },
  component: Typography,
  tags: ['autodocs'],
  title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    children: text,
    variant: 'large',
  },
}
export const H1: Story = {
  args: {
    children: text,
    variant: 'h1',
  },
}

export const H2: Story = {
  args: {
    children: text,
    variant: 'h2',
  },
}

export const H3: Story = {
  args: {
    children: text,
    variant: 'h3',
  },
}

export const RegularText16: Story = {
  args: {
    children: text,
    variant: 'regular_text_16',
  },
}
export const BoldText16: Story = {
  args: {
    children: text,
    variant: 'bold_text_16',
  },
}

export const RegularText14: Story = {
  args: {
    children: text,
    variant: 'regular_text_14',
  },
}

export const MediumText14: Story = {
  args: {
    children: text,
    variant: 'medium_text_14',
  },
}
export const BoldText14: Story = {
  args: {
    children: text,
    variant: 'bold_text_14',
  },
}
export const SmallText: Story = {
  args: {
    children: text,
    variant: 'small_text',
  },
}
export const SemiBoldSmallText: Story = {
  args: {
    children: text,
    variant: 'semi-bold_small_text',
  },
}

export const RegularLink: Story = {
  args: {
    children: text,
    variant: 'regular_link',
  },
}

export const SmallLink: Story = {
  args: {
    children: text,
    variant: 'small_link',
  },
}
