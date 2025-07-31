import { z } from 'zod'

export const zDimensions = z
  .array(
    z.object({
      id: z.string(),
      alias: z.string().optional(),
      visible: z.boolean().default(true).optional(),
      location: z
        .enum(['dimension', 'rowDimension', 'columnDimension'])
        .optional(),
    }),
  )
  .optional()

export type Dimensions = z.infer<typeof zDimensions>
