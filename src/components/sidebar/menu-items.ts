import {
  BookmarkIcon,
  BookmarkOutlineIcon,
  HomeIcon,
  HomeOutlineIcon,
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
} from '@/components/icons'

// todo: подумать куда вынести enum
enum Paths {
  create = 'create',
  favourites = 'favourites',
  home = '/home',
  messages = 'messages',
  profile = 'profile',
  search = 'search',
  statistics = 'statistics',
}

export const menuItems = [
  {
    Icon: HomeIcon,
    OutlineIcon: HomeOutlineIcon,
    label: 'Home',
    path: Paths.home,
  },
  {
    Icon: PlusSquareIcon,
    OutlineIcon: PlusSquareOutlineIcon,
    label: 'Create',
    path: Paths.create,
  },
  {
    Icon: PersonIcon,
    OutlineIcon: PersonOutlineIcon,
    label: 'My Profile',
    path: Paths.profile,
  },
  {
    Icon: MessageCircleIcon,
    OutlineIcon: MessageCircleOutlineIcon,
    label: 'Messenger',
    path: Paths.messages,
  },
  { Icon: SearchIcon, OutlineIcon: SearchOutlineIcon, label: 'Search', path: Paths.search },
  {
    Icon: TrendingUpIcon,
    OutlineIcon: TrendingUpOutlineIcon,
    label: 'Statistics',
    path: Paths.statistics,
  },
  {
    Icon: BookmarkIcon,
    OutlineIcon: BookmarkOutlineIcon,
    label: 'Favourites',
    path: Paths.favourites,
  },
]
