import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components/button'
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog/Dialog'
import { CloseOutlineIcon, MoreHorizontalIcon } from '@/components/icons'
import { TextField } from '@/components/text-field'
import { Typography } from '@/components/typography'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import { Checkbox } from '../checkbox'

const descriptionMockText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. ' +
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'

const meta = {
  argTypes: {},
  component: DialogRoot,
  tags: ['autodocs'],
  title: 'Components/Dialog',
} satisfies Meta<typeof DialogRoot>

export default meta
type Story = StoryObj<typeof meta>

export const Dialog: Story = {
  render: () => {
    return (
      <DialogRoot>
        <Trigger />
        <DialogContent style={{ maxWidth: '542px' }}>
          <Title />
          <Header />
          <Description />
          <Body />
          <Footer />
        </DialogContent>
      </DialogRoot>
    )
  },
}

const Trigger = () => (
  <DialogTrigger asChild>
    <Button title={'click to open'} variant={'icon'}>
      <MoreHorizontalIcon />
    </Button>
  </DialogTrigger>
)

const Title = () => (
  <VisuallyHidden asChild>
    <DialogTitle>Dialog Title</DialogTitle>
  </VisuallyHidden>
)

const Header = () => (
  <DialogHeader>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography as={'h3'} variant={'h3'}>
        Dialog Header
      </Typography>
      <DialogClose asChild>
        <Button title={'close'} variant={'icon'}>
          <CloseOutlineIcon />
        </Button>
      </DialogClose>
    </div>
  </DialogHeader>
)

const Description = () => (
  <VisuallyHidden>
    <DialogDescription>{descriptionMockText}</DialogDescription>
  </VisuallyHidden>
)

const Body = () => (
  <DialogBody>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Typography variant={'regular_text_14'}>{descriptionMockText}</Typography>
      <TextField label={'Some Label'} placeholder={'some placeholder...'} />
      <Checkbox isRequired label={'CheckBox label'} />
    </div>
  </DialogBody>
)

const Footer = () => (
  <DialogFooter>
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-end' }}>
      <Button variant={'outlined'}>Yes</Button>
      <Button>No</Button>
    </div>
  </DialogFooter>
)
