import { z } from 'zod'

export const WhereFiltersBuilderSchema = z.object({
  add: z.custom<(filter: string) => void>(),
})

export type WhereFiltersBuilder = z.infer<typeof WhereFiltersBuilderSchema>
