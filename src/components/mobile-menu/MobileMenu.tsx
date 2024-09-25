import { Item } from '@/components/sidebar'
import { menuItems } from '@/components/sidebar/menu-items'
import { useRouter } from 'next/router'

import s from './MobileMenu.module.scss'

export const MobileMenu = () => {
  const router = useRouter()

  return (
    <nav className={s.container}>
      {menuItems.slice(0, 5).map(({ Icon, OutlineIcon, label, path }, i) => (
        <Item
          Icon={Icon}
          OutlineIcon={OutlineIcon}
          isActive={router.pathname === path}
          key={label + i}
          path={path}
        />
      ))}
    </nav>
  )
}
