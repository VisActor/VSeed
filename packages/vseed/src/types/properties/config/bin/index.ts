import { z } from 'zod'

export const zBinCountConfig = z.number()

export type BinCountConfig = z.infer<typeof zBinCountConfig>

export const zBinStepConfig = z.number()

export type BinStepConfig = z.infer<typeof zBinStepConfig>

export const zBinValueTypeConfig = z.enum(['count', 'percentage'])

export type BinValueTypeConfig = z.infer<typeof zBinValueTypeConfig>
