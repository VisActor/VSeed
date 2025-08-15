import { z } from 'zod'

export const zLabel = z.object({
  enable: z.boolean().default(true).optional(),
})

export type Label = {
  /**
   * 标签功能是否开启
   * @default true
   */
  enable: boolean
}
