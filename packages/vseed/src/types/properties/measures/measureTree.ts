import type { TableMeasure } from './tableMeasure'

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
  children?: (TableMeasure | MeasureGroup)[]
}

export type MeasureTree = (TableMeasure | MeasureGroup)[]
