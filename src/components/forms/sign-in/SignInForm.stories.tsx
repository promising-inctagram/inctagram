import { SignInCard } from '@/components/forms/sign-in/SignInForm'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SignInCard> = {
  argTypes: {},
  component: SignInCard,
  tags: ['autodocs'],
  title: 'components/SignInCard',
}

export default meta
type Story = StoryObj<typeof SignInCard>

export const DefaultStory: Story = {
  name: 'SignInCard',
  render: () => {
    return (
      <section
        style={{
          alignItems: 'center',
          display: 'flex',
          height: 'calc(100vh - 60px)',
          justifyContent: 'center',
        }}
      >
        <SignInCard />
      </section>
    )
  },
}
