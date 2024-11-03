export const useDeviceSize = (type: string | undefined) => {
  if (type === 'mobile' || window.innerWidth < 768) {
    return true
  } else if (type === 'desktop' || window.innerWidth > 768) {
    return false
  }
}
