export const MAX_BADGE_COUNT = 99

// validation constants:
export const MIN_USERNAME_LENGTH = 6
export const MAX_USERNAME_LENGTH = 30
export const MIN_PASSWORD_LENGTH = 6
export const MAX_PASSWORD_LENGTH = 20

export const MIN_FIRST_NAME_LENGTH = 1
export const MAX_FIRST_NAME_LENGTH = 50
export const MIN_LAST_NAME_LENGTH = 1
export const MAX_LAST_NAME_LENGTH = 50
export const MAX_ABOUT_ME_LENGTH = 200

export const MAX_POST_DESCRIPTION_LENGTH = 500
export const MAX_POST_FILE_SIZE = 20 * 1024 * 1024

export const USERNAME_REGEX = /^[a-zA-Z0-9_-]*$/

export const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,\-.:;<=>?@[\]^_`{|}~])/

// api constants:
export const ACCESS_TOKEN = 'accessToken'

export const FIRST_NAME_REGEX = /^[A-Za-zА-Яа-яЁё]*$/ // A-Z; a-z; А-Я; а-я

export const LAST_NAME_REGEX = /^[A-Za-zА-Яа-яЁё]*$/ // A-Z; a-z; А-Я; а-я

export const DATE_OF_BIRTH_REGEX = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/ // Формат dd.mm.yyyy

export const ABOUT_ME_REGEX = /^[A-Za-zА-Яа-яЁё0-9\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]*$/ // 0-9; A-Z; a-z; А-Я; а-я; + спец символы
