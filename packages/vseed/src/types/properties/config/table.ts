import { z } from 'zod'
import { zBackgroundColor } from './backgroundColor/backgroundColor'

export const zTableConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),

  // Border
  borderColor: z.string().nullish(),

  // Body
  bodyFontSize: z.number().nullish(),
  bodyFontColor: z.string().nullish(),
  bodyBackgroundColor: z.string().nullish(),
  // Body interaction
  hoverBodyBackgroundColor: z.string().nullish(),
  hoverBodyInlineBackgroundColor: z.string().nullish(),

  // Header
  headerFontSize: z.number().nullish(),
  headerFontColor: z.string().nullish(),
  headerBackgroundColor: z.string().nullish(),
  // Header interaction
  hoverHeaderBackgroundColor: z.string().nullish(),
  hoverHeaderInlineBackgroundColor: z.string().nullish(),

  // Interaction
  selectedBorderColor: z.string().nullish(),
  selectedBackgroundColor: z.string().nullish(),
})

export type TableConfig = z.infer<typeof zTableConfig>
