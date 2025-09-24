import { z } from 'zod'

export const zColor = z.object({
  colorScheme: z.array(z.string()).nullish(),
  linearColorScheme: z.array(z.string()).nullish(),
  colorMapping: z.record(z.string(), z.string()).nullish(),
})

export const zLinearColor = z.object({
  linearColorScheme: z.array(z.string()).nullish(),
})

export type Color = {
  /**
   * @description 离散颜色配色方案, 颜色配色方案用于定义图表中不同元素的颜色
   * @example ['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']
   */
  colorScheme?: string[]
  /**
   * @description 线性渐变颜色配色方案, 线性渐变颜色配色方案用于定义图表中不同元素的颜色
   * @example ['#FFCDD2, #F8BBD0]
   */
  linearColorScheme?: string[]
  /**
   * @description 颜色映射, 颜色映射用于将数据值映射到具体的颜色
   * @example
   * {
   *  'profit': 'red',
   *  'sales': 'blue',
   * }
   */
  colorMapping?: Record<string, string>
}
