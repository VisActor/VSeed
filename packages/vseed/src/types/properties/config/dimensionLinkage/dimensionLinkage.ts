import { z } from 'zod'

export const zDimensionLinkage = z.object({
  enable: z.boolean().nullish(),
  showTooltip: z.boolean().nullish(),
  showLabel: z.boolean().nullish(),
})

/**
 * 透视图表维度联动配置
 */
export type DimensionLinkage = {
  /**
   * 是否开启透视图表维度联动
   */
  enable: boolean
  /**
   * 是否显示所有维度对应子图表的Tooltip提示信息
   */
  showTooltip?: boolean
  /**
   * 是否显示crosshair 对应的标签
   */
  showLabel?: boolean
}
