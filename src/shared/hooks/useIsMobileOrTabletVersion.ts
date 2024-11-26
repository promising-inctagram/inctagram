import { useLayoutEffect, useState } from 'react'

import { Breakpoints } from '@/shared/enums/breakpoints.enum'

export const useIsMobileOrTabletVersion = () => {
  const [isTablet, setIsTablet] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth < Breakpoints.tablet)
      setIsMobile(window.innerWidth < Breakpoints.mobile)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isTablet || isMobile
}
