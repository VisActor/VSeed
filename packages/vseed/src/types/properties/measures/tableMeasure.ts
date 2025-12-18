import type { BaseMeasure } from './baseMeasure'

export type TableMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - column: 指标列
   */
  encoding?: 'column'
}
