import { useEffect, useState } from 'react'

import { Breakpoints } from '@/shared/enums/breakpoints.enum'

export const useIsMobileOrTabletVersion = () => {
  const [isTablet, setIsTablet] = useState(true)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const handleWindowResizeForTablet = () => setIsTablet(window.innerWidth < Breakpoints.tablet)
    const handleWindowResizeForMobile = () => setIsMobile(window.innerWidth < Breakpoints.mobile)

    window.addEventListener('resize', handleWindowResizeForTablet)
    window.addEventListener('resize', handleWindowResizeForMobile)

    return () => {
      window.removeEventListener('resize', handleWindowResizeForTablet)
      window.removeEventListener('resize', handleWindowResizeForMobile)
    }
  }, [])

  return isTablet || isMobile
}
