import { useEffect } from 'react'

export const useSettingsForm = (aboutMe: string) => {
  useEffect(() => {
    if (!aboutMe) {
      localStorage.setItem('firstAboutMe', 'primary')
    } else {
      localStorage.setItem('firstAboutMe', 'secondary')
    }

    return () => {
      if (localStorage.getItem('firstAboutMe') === 'primary') {
        localStorage.removeItem('firstAboutMe')
      }
    }
  }, [aboutMe])

  const changeAboutMeHandler = () => {
    if (localStorage.getItem('firstAboutMe') === 'primary') {
      localStorage.setItem('firstAboutMe', 'secondary')
    }
  }

  return {
    changeAboutMeHandler,
  }
}
