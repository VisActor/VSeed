import { z } from 'zod'
import { zBodyCellStyle } from './bodyCellStyle'

export const zCellStyle = z.object({
  bodyCellStyle: zBodyCellStyle.nullish(),
})

export type CellStyle = z.infer<typeof zCellStyle>
