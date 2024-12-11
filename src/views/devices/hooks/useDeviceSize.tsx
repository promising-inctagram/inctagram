export const useDeviceSize = (type: string | undefined) => {
  if (type === 'mobile') {
    return true
  } else if (type === 'Desktop') {
    return false
  }
}
