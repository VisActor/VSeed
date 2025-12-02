import { z } from 'zod'

export const zWhereFiltersBuilder = z.object({
  add: z.custom<(filter: string) => void>(),
})

export type WhereFiltersBuilder = z.infer<typeof zWhereFiltersBuilder>
