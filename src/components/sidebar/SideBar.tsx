import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

type SideBarProps = ComponentPropsWithoutRef<'nav'>
type SideBarRef = ElementRef<'nav'>
export const SideBar = forwardRef<SideBarRef, SideBarProps>(({ ...rest }, ref) => {
  console.log('SideBar')

  return <nav ref={ref} {...rest}></nav>
})
