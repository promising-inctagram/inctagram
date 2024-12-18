import { z } from 'zod'

import { createPostSchemeCreator } from './create-post-scheme-creator'

export type AddPostFields = z.infer<ReturnType<typeof createPostSchemeCreator>>
