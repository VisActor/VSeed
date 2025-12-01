import { z } from 'zod'

export const zBoxMaxWidth = z.number().or(z.string())

export const zBoxGapInGroup = z.number().or(z.string())
