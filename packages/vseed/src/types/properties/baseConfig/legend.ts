import { z } from 'zod'

export const zLegend = z.object({
  enable: z.boolean().default(true).optional(),
})

export type Legend = {
  /**
   * 图例功能是否开启
   * @default true
   */
  enable: boolean
}
