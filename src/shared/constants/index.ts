export const MAX_BADGE_COUNT = 99

// validation constants:
export const MIN_USERNAME_LENGTH = 6
export const MAX_USERNAME_LENGTH = 30
export const MIN_PASSWORD_LENGTH = 6
export const MAX_PASSWORD_LENGTH = 20

export const USERNAME_REGEX = /^[a-zA-Z0-9_-]*$/

export const AT_LEAST_ONE_LETTER_REGEX = /^(?=.*[a-z])(?=.*[A-Z])/
export const AT_LEAST_ONE_NUMBER_REGEX = /^(?=.*[0-9])/
export const AT_LEAST_ONE_SPEC_SYMBOL_REGEX = /^(?=.*[!"#$%&'()*+,\-.:;<=>?@[\]^_`{|}~])/
export const ALLOWED_CHARACTERS_REGEX = /^[a-zA-Z0-9!"#$%&'()*+,\-.:;<=>?@[\]^_`{|}~]*$/
