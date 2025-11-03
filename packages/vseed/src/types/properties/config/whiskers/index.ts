import { z } from 'zod'

export const zWhiskersConfig = z.number().or(z.array(z.number())).default(1.5)

export type WhiskersConfig = z.infer<typeof zWhiskersConfig>
