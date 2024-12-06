import {
  BookmarkIcon,
  BookmarkOutlineIcon,
  HomeIcon,
  HomeOutlineIcon,
  LogOutIcon,
  LogOutOutlineIcon,
  MessageCircleIcon,
  MessageCircleOutlineIcon,
  PersonIcon,
  PersonOutlineIcon,
  PlusSquareIcon,
  PlusSquareOutlineIcon,
  SearchIcon,
  SearchOutlineIcon,
  TrendingUpIcon,
  TrendingUpOutlineIcon,
} from '@/components/ui/icons'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'

export const SidebarMenuItems = () => {
  const { t } = useTranslation()
  const { create, favourites, home, log_out, messenger, my_profile, search, statistics } = t.sidebar

  return [
    {
      Icon: HomeIcon,
      OutlineIcon: HomeOutlineIcon,
      label: home,
      path: Paths.home,
    },
    {
      Icon: PlusSquareIcon,
      OutlineIcon: PlusSquareOutlineIcon,
      label: create,
      path: Paths.create,
    },
    {
      Icon: PersonIcon,
      OutlineIcon: PersonOutlineIcon,
      label: my_profile,
      path: Paths.profile,
    },
    {
      Icon: MessageCircleIcon,
      OutlineIcon: MessageCircleOutlineIcon,
      label: messenger,
      path: Paths.messages,
    },
    { Icon: SearchIcon, OutlineIcon: SearchOutlineIcon, label: search, path: Paths.search },
    {
      Icon: TrendingUpIcon,
      OutlineIcon: TrendingUpOutlineIcon,
      label: statistics,
      path: Paths.statistics,
    },
    {
      Icon: BookmarkIcon,
      OutlineIcon: BookmarkOutlineIcon,
      label: favourites,
      path: Paths.favourites,
    },
    {
      Icon: LogOutIcon,
      OutlineIcon: LogOutOutlineIcon,
      label: log_out,
    },
  ]
}
