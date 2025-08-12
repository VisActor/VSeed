import { z } from 'zod'
import { zBarStyle } from './barStyle'
import { zPointStyle } from './pointStyle'

export const zMarkStyle = z.object({
  barStyle: zBarStyle.or(z.array(zBarStyle)).optional(),
  pointStyle: zPointStyle.or(z.array(zPointStyle)).optional(),
})

export type MarkStyle = z.infer<typeof zMarkStyle>
