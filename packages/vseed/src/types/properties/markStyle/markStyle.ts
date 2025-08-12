import { z } from 'zod'
import { zBarStyle } from './barStyle'

export const zMarkStyle = z.object({
  barStyle: zBarStyle.or(z.array(zBarStyle)).optional(),
})

export type MarkStyle = z.infer<typeof zMarkStyle>
