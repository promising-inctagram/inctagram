export const useDeviceSize = (type: string | undefined) => {
  if (type === 'Mobile') {
    return true
  } else if (type === 'Desktop') {
    return false
  }
}
