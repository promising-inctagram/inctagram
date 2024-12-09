import { LocaleAddPost } from '@/locales/en'
import { z } from 'zod'

export const createPostSchemeCreator = (t: LocaleAddPost) => {
  return z.object({
    description: z
      .string()
      .max(500, t.addDescription.descriptionError)
      .refine(
        value => value.length === 0 || value.trim().length > 0,
        t.addDescription.descriptionErrorEmptyField
      ),
  })
}
