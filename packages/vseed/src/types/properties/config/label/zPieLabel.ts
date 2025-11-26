import { z } from 'zod'
import { zLabel } from './zLabel'

export const zPieLabel = zLabel.extend({
  labelLayout: z.union([z.literal('arc'), z.literal('labelLine'), z.literal('edge')]).nullish(),
})
