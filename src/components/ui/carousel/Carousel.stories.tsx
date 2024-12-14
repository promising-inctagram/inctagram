import dummyImage2 from '@/assets/webp/Mask group.png'
import dummyImage from '@/assets/webp/dummy-image.webp'
import { Carousel } from '@/components/ui/carousel/Carousel'
import { Image } from '@/shared/types/public-page/Posts'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Carousel> = {
  argTypes: {},
  component: Carousel,
  tags: ['autodocs'],
  title: 'components/Carousel',
}

export default meta
type Story = StoryObj<typeof Carousel>

const slides: Image[] = [
  {
    id: '1',
    mediumFilePath: dummyImage.src,
    originFilePath: dummyImage2.src,
    smallFilePath: dummyImage2.src,
  },
  {
    id: '2',
    mediumFilePath: dummyImage.src,
    originFilePath: dummyImage2.src,
    smallFilePath: dummyImage2.src,
  },
]

export const DefaultStory: Story = {
  args: {
    slides: slides.map(i => i),
  },
  name: 'Carousel',
  render: args => (
    <div style={{ height: '500px', width: '500px' }}>
      <Carousel {...args} />
    </div>
  ),
}
