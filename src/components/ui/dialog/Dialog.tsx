import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RDXD from '@radix-ui/react-dialog'
import clsx from 'clsx'

import s from './Dialog.module.scss'

const DialogRoot = RDXD.Root
const DialogTrigger = RDXD.Trigger
const DialogPortal = RDXD.Portal
const DialogClose = RDXD.Close

type DialogOverlayProps = ComponentPropsWithoutRef<typeof RDXD.Overlay>
type DialogOverlayRef = ElementRef<typeof RDXD.Overlay>

const DialogOverlay = forwardRef<DialogOverlayRef, DialogOverlayProps>(
  ({ className, ...rest }, ref) => (
    <RDXD.Overlay className={clsx(s.overlay, className)} ref={ref} {...rest} />
  )
)

DialogOverlay.displayName = RDXD.Overlay.displayName

type DialogContentProps = {
  overlayClassName?: string
} & ComponentPropsWithoutRef<typeof RDXD.Content>
type DialogContentRef = ElementRef<typeof RDXD.Content>

const DialogContent = forwardRef<DialogContentRef, DialogContentProps>(
  ({ className, overlayClassName, ...rest }, ref) => (
    <DialogPortal>
      <DialogOverlay className={overlayClassName} />
      <RDXD.Content className={clsx(s.content, className)} ref={ref} {...rest} />
    </DialogPortal>
  )
)

DialogContent.displayName = RDXD.Content.displayName

type DialogTitleProps = ComponentPropsWithoutRef<typeof RDXD.Title>
type DialogTitleRef = ElementRef<typeof RDXD.Title>

const DialogTitle = forwardRef<DialogTitleRef, DialogTitleProps>(({ className, ...props }, ref) => (
  <RDXD.Title ref={ref} {...props} />
))

DialogTitle.displayName = RDXD.Title.displayName

type DialogHeaderProps = ComponentPropsWithoutRef<'div'>

const DialogHeader = ({ className, ...rest }: DialogHeaderProps) => (
  <div className={clsx(s.header, className)} {...rest} />
)

type DialogDescriptionProps = ComponentPropsWithoutRef<typeof RDXD.Description>
type DialogDescriptionRef = ElementRef<typeof RDXD.Description>

const DialogDescription = forwardRef<DialogDescriptionRef, DialogDescriptionProps>(
  ({ className, ...rest }, ref) => (
    <RDXD.Description className={clsx(s.description, className)} ref={ref} {...rest} />
  )
)

DialogDescription.displayName = RDXD.Description.displayName

type DialogBodyProps = ComponentPropsWithoutRef<'div'>

const DialogBody = ({ className, ...rest }: DialogBodyProps) => (
  <div className={clsx(s.body, className)} {...rest} />
)

type DialogFooterProps = ComponentPropsWithoutRef<'div'>

const DialogFooter = ({ className, ...rest }: DialogFooterProps) => (
  <div className={clsx(s.footer, className)} {...rest} />
)

export {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
}
