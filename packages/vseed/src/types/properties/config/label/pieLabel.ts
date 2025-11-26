import type { Label } from './label'

export type PieLabel = Label & {
  /**
   * @description 标签布局方式, 仅对饼图、环形图生效且`labelPosition`为`outside`时生效
   * - arc: 按弧形为标签布局
   * - labelLine: 标签两端对齐, 通过引导线连接扇形图元与标签
   * - edge: 标签两端对齐, 通过引导线连接扇形图元与标签, 并且贴近图表两端边缘
   */
  labelLayout?: 'arc' | 'labelLine' | 'edge'
}
