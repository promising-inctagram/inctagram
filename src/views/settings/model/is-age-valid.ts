import { isBefore, subYears } from 'date-fns'

export const isAgeValid = (dateOfBirth: Date | null): boolean => {
  const ageLimitDate = subYears(new Date(), 13)

  return dateOfBirth ? isBefore(dateOfBirth, ageLimitDate) : false
}
