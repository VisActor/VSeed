import { z } from 'zod'

export const zTooltip = z.object({
  enable: z.boolean().default(true).nullish(),
  borderColor: z.string().nullish(),
  borderWidth: z.number().nullish(),
  borderRadius: z.number().nullish(),
  padding: z.number().or(z.array(z.number()).length(4)).nullish(),
  backgroundColor: z.string().nullish(),
  lineHeight: z.number().nullish(),
  fontSize: z.number().nullish(),
  lineSpace: z.number().nullish(),
  keyColor: z.string().nullish(),
  valueColor: z.string().nullish(),
  titleColor: z.string().nullish(),
})

export type TooltipConfig = z.infer<typeof zTooltip>

export type Tooltip = {
  /**
   * 提示信息功能是否开启
   * @default true
   */
  enable: boolean
}
