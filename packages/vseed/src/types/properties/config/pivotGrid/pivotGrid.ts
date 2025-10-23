import { z } from 'zod'

export const zPivotChartGridConfig = z.object({
  borderColor: z.string().nullish(),
  bodyFontColor: z.string().nullish(),
  headerFontColor: z.string().nullish(),
  headerBackgroundColor: z.string().nullish(),
  hoverHeaderBackgroundColor: z.string().nullish(),
  hoverHeaderInlineBackgroundColor: z.string().nullish(),
})

export type PivotChartGridConfig = z.infer<typeof zPivotChartGridConfig>
