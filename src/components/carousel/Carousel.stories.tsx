import dummyImage2 from '@/assets/webp/Mask group.png'
import dummyImage from '@/assets/webp/dummy-image.webp'
import { Carousel } from '@/components/carousel/Carousel'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Carousel> = {
  argTypes: {},
  component: Carousel,
  tags: ['autodocs'],
  title: 'components/Carousel',
}

export default meta
type Story = StoryObj<typeof Carousel>

const slides = [dummyImage, dummyImage2]

export const DefaultStory: Story = {
  args: {
    slides: slides.map(i => i.src),
  },
  name: 'Carousel',
  render: args => (
    <div style={{ height: '500px', width: '500px' }}>
      <Carousel {...args} />
    </div>
  ),
}
