import { z } from 'zod'

export const zDimension = z.object({
  id: z.string(),
  alias: z.string().optional(),
  visible: z.boolean().default(true).optional(),
  location: z.enum(['dimension', 'rowDimension', 'columnDimension']),
})

export const zDimensions = z.array(zDimension).optional()

export type Dimension = z.infer<typeof zDimension>

export type Dimensions = z.infer<typeof zDimensions>
