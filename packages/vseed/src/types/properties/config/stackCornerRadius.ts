import { z } from 'zod'

export const zStackCornerRadius = z.number().or(z.array(z.number())).default([3, 3, 0, 0])

export type StackCornerRadius = z.infer<typeof zStackCornerRadius>
