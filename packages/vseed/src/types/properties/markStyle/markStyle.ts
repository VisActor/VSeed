import { z } from 'zod'
import { zBarStyle } from './barStyle'
import { zPointStyle } from './pointStyle'
import { zLineStyle } from './lineStyle'
import { zAreaStyle } from './zAreaStyle'
import { zBoxPlotStyle } from './boxPlotStyle'
import { zOutlierStyle } from './outlierStyle'

export const zMarkStyle = z.object({
  barStyle: zBarStyle.or(z.array(zBarStyle)).nullish(),
  pointStyle: zPointStyle.or(z.array(zPointStyle)).nullish(),
  lineStyle: zLineStyle.or(z.array(zLineStyle)).nullish(),
  areaStyle: zAreaStyle.or(z.array(zAreaStyle)).nullish(),
  boxPlotStyle: zBoxPlotStyle.or(z.array(zBoxPlotStyle)).nullish(),
  outlierStyle: zOutlierStyle.or(z.array(zOutlierStyle)).nullish(),
})

export type MarkStyle = z.infer<typeof zMarkStyle>
