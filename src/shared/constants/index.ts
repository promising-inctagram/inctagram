export const MAX_BADGE_COUNT = 99
export const AVATAR_MAX_FILE_SIZE = 10 * 1024 * 1024 //10MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png']

// validation constants:
export const MIN_USERNAME_LENGTH = 6
export const MAX_USERNAME_LENGTH = 30
export const MIN_PASSWORD_LENGTH = 6
export const MAX_PASSWORD_LENGTH = 20

export const USERNAME_REGEX = /^[a-zA-Z0-9_-]*$/

export const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,\-.:;<=>?@[\]^_`{|}~])/

// api constants:
export const ACCESS_TOKEN = 'accessToken'
