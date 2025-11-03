import { z } from 'zod'

export const zBinCountConfig = z.number()

export const zBinStepConfig = z.number()

export const zBinValueTypeConfig = z.enum(['count', 'percentage'])
