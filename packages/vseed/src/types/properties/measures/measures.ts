import { z } from 'zod'
import type { NumFormat } from './format/numFormat'
import { zNumFormat } from './format/numFormat'

export type Measure = {
  /**
   * @description 指标id, 不能重复
   */
  id: string
  /**
   * @description 指标别名, 允许重复, 未填写时, alias 为 id
   * @default id
   */
  alias?: string
  /**
   * @description 是否自动格式化
   * @default true
   */
  autoFormat?: boolean
  /**
   * @description 指标的数值格式化, 会自动应用于label、tooltip
   */
  format?: NumFormat
}

export type MeasureGroup = {
  /**
   * @description 指标组id, 不能重复
   */
  id: string
  /**
   * @description 指标组别名, 允许重复, 未填写时, alias 为 id
   * @default id
   */
  alias?: string
  /**
   * @description 指标组的子指标或指标组
   */
  children?: (Measure | MeasureGroup)[]
}

export type Measures = (Measure | MeasureGroup)[]

export const zMeasure = z.object({
  id: z.string(),
  alias: z.string().optional(),
  autoFormat: z.boolean().default(true).optional(),
  format: zNumFormat.default({}).optional(),
})

export const zMeasureGroup = z.object({
  id: z.string(),
  alias: z.string().optional(),
  get children() {
    return z.array(zMeasureGroup.or(zMeasure)).optional()
  },
})

export const zMeasures = z.array(zMeasureGroup.or(zMeasure)).optional()
