import { z } from 'zod'

export const zColor = z.object({
  colorScheme: z.array(z.string()).optional(),
  colorMapping: z.record(z.string(), z.string()).optional(),
})

export const zLinearColor = z.object({
  colorScheme: z.array(z.string()).optional(),
})

export type Color = {
  /**
   * 颜色配色方案
   * @description 颜色配色方案用于定义图表中不同元素的颜色
   * @example ['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']
   */
  colorScheme?: string[]
  /**
   * 颜色映射
   * @description 颜色映射用于将数据值映射到具体的颜色
   * @example
   * {
   *  'profit': 'red',
   *  'sales': 'blue',
   * }
   */
  colorMapping?: Record<string, string>
}

export type LinearColor = {
  /**
   * 线性渐变颜色配色方案
   * @description 线性渐变颜色配色方案用于定义图表中不同元素的颜色
   * @example ['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']
   */
  colorScheme?: string[]
}
