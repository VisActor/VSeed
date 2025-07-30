import z from 'zod'

export const zDimensions = z
  .array(
    z.object({
      id: z.string(),
      alias: z.string().optional(),
      visible: z.boolean().optional().default(true),
      location: z
        .enum(['dimension', 'rowDimension', 'columnDimension'])
        .optional(),
    }),
  )
  .optional()

export type Dimensions = z.infer<typeof zDimensions>
