import { z } from 'zod'
import { zBarStyle } from './barStyle'
import { zPointStyle } from './pointStyle'
import { zLineStyle } from './lineStyle'
import { zAreaStyle } from './areaStyle'

export const zMarkStyle = z.object({
  barStyle: zBarStyle.or(z.array(zBarStyle)).optional(),
  pointStyle: zPointStyle.or(z.array(zPointStyle)).optional(),
  lineStyle: zLineStyle.or(z.array(zLineStyle)).optional(),
  areaStyle: zAreaStyle.or(z.array(zAreaStyle)).optional(),
})

export type MarkStyle = z.infer<typeof zMarkStyle>
