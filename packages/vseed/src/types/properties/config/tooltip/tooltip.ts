import { z } from 'zod'

export const zTooltip = z.object({
  enable: z.boolean().default(true).optional(),
})

export type Tooltip = {
  /**
   * 提示信息功能是否开启
   * @default true
   */
  enable: boolean
}
