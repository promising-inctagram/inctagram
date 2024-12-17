import * as React from 'react'

import {
  Button,
  Carousel,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  Typography,
} from '@/components/ui'
import { CloseOutlineIcon } from '@/components/ui/icons'
import { UrlProfile } from '@/components/urlProfile'
import { PostType } from '@/shared/types/public-page/Posts'
import { User } from '@/shared/types/public-page/User'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import s from './PostModal.module.scss'

type Props = {
  handleClosePost: (isOpen: boolean) => void
  isOpen: boolean
  post: PostType<{}>
  profile: User
}

export const PostModal = ({ handleClosePost, isOpen, post, profile }: Props) => {
  console.log(post)

  return (
    <DialogRoot open={isOpen}>
      <DialogPortal>
        <DialogContent className={s.content}>
          <div className={s.carouselContainer}>
            <Carousel slides={post?.images} />
          </div>
          <div className={s.postInfoContainer}>
            <DialogHeader className={s.headerContainer}>
              <UrlProfile
                src={profile?.profile.avatarInfo.smallFilePath}
                userName={profile?.username}
              />
              <DialogClose asChild>
                <Button
                  className={s.closeBtn}
                  onClick={handleClosePost}
                  title={'close'}
                  variant={'icon'}
                >
                  <CloseOutlineIcon />
                </Button>
              </DialogClose>
            </DialogHeader>
            <DialogDescription>Comments</DialogDescription>
          </div>

          {/*<DialogHeader className={s.header}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography as={'h3'} variant={'h3'}>
              Dialog Header
            </Typography>
            <DialogClose asChild>
              <Button
                className={s.closeBtn}
                onClick={handleClosePost}
                title={'close'}
                variant={'icon'}
              >
                <CloseOutlineIcon />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        <Comments />
        <Footer />*/}
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  )
}

const Header = () => (
  <DialogHeader>
    {/*<div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography as={'h3'} variant={'h3'}>
        Dialog Header
      </Typography>
      <DialogClose asChild>
        <Button onClick={handleClosePost} title={'close'} variant={'icon'}>
          <CloseOutlineIcon />
        </Button>
      </DialogClose>
    </div>*/}
  </DialogHeader>
)
const Comments = () => (
  <VisuallyHidden>
    <DialogDescription>Comments</DialogDescription>
  </VisuallyHidden>
)

const Footer = () => (
  <DialogFooter>
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-end' }}>
      <Button variant={'outlined'}>Yes</Button>
      <Button>No</Button>
    </div>
  </DialogFooter>
)
