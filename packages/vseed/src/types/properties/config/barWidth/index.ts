import { z } from 'zod'

export const zBarMaxWidth = z.number().or(z.string())
export const zBoxMaxWidth = z.number().or(z.string())

export type BarMaxWidth = z.infer<typeof zBarMaxWidth>
export type BoxMaxWidth = z.infer<typeof zBoxMaxWidth>

export const zBarGapInGroup = z.number().or(z.string())
export const zBoxGapInGroup = z.number().or(z.string())

export type BarGapInGroup = z.infer<typeof zBarGapInGroup>
export type BoxGapInGroup = z.infer<typeof zBoxGapInGroup>
