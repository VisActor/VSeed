import { z } from 'zod'

export const zBarMaxWidth = z.number().or(z.string())

export type BarMaxWidth = z.infer<typeof zBarMaxWidth>

export const zBarGapInGroup = z.number().or(z.string())

export type BarGapInGroup = z.infer<typeof zBarGapInGroup>
