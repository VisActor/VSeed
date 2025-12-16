import type { MeasureEncoding } from '../encoding'
import type { NumFormat } from '../format/numFormat'

/**
 * @description 最基础的度量配置
 */
export type BaseMeasure = {
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
   * @description 自动数值格式化 当配置了 format 时, 该配置项失效
   * 开启后, 图表的数据标签、提示信息, 会根据指标的数值, 自动根据语言环境, 选择合适的格式化方式
   * 格式化规则为设置为十进制数值, 开启compact notation, 最小0位小数, 最大2位小数, 自动四舍五入, 使用浏览器提供的 Intl.NumberFormatOptions 实现该逻辑.
   * 例如:
   * 当locale为zh-CN: 749740.264会被自动格式化为74.45万
   * 当locale为en-US: 749740.264会被自动格式化为744.5K
   * @default true
   */
  autoFormat?: boolean

  /**
   * @description 指标的数值格式化, 会自动应用于label、tooltip
   */
  numFormat?: NumFormat

  /**
   * @description same as numFormat, 指标的数值格式化, 会自动应用于label、tooltip
   */
  format?: NumFormat

  /**
   * @description 指标映射的通道
   * - primaryYAxis: 指标映射的主y轴, 仅用于双轴图
   * - secondaryYAxis: 指标映射的次y轴, 仅用于双轴图
   * - xAxis: 指标映射的x轴, 适用于条形图、散点图
   * - yAxis: 指标映射的y轴, 适用于柱状图、折线图、面积图、散点图
   * - angle: 指标映射的角度, 适用于饼图、环形图、雷达图
   * - radius: 指标映射的半径, 适用于玫瑰图
   * - size: 指标映射的大小, 适用于漏斗图、散点图
   * - detail: 指标映射的详情, 适用于透视表、热力图
   * - column: 指标映射的列, 仅适用于表格
   * - color: 指标映射的颜色, 适用于所有图表
   * - label: 指标映射的标签, 适用于所有图表
   * - tooltip: 指标映射的提示, 适用于所有图表
   */
  encoding?: MeasureEncoding

  /**
   * @description 以扁平的指标配置形式, 构建树形指标组, parentId指向父级指标组的id, 用于构建指标树
   * @tip 指标树的配置存在两种形式, 方式一是直接配置带children的指标树, 方式二是配置parentId的扁平指标列表, 两种方式不能同时配置
   */
  parentId?: string
}

/**
 * @description 指标
 */
export type Measure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - primaryYAxis: 指标映射的主y轴, 仅用于双轴图
   * - secondaryYAxis: 指标映射的次y轴, 仅用于双轴图
   * - xAxis: 指标映射的x轴, 适用于条形图、散点图
   * - yAxis: 指标映射的y轴, 适用于柱状图、折线图、面积图、散点图
   * - angle: 指标映射的角度, 适用于饼图、环形图、雷达图
   * - radius: 指标映射的半径, 适用于玫瑰图
   * - size: 指标映射的大小, 适用于漏斗图、散点图
   * - detail: 指标映射的详情, 适用于透视表、热力图
   * - column: 指标映射的列, 仅适用于表格
   * - color: 指标映射的颜色, 适用于所有图表
   * - label: 指标映射的标签, 适用于所有图表
   * - tooltip: 指标映射的提示, 适用于所有图表
   */
  encoding?: MeasureEncoding
}

export type ColumnMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - yAxis: 指标映射的y轴
   * - detail: 指标映射的详情
   * - color: 指标映射的颜色
   * - label: 指标映射的标签
   * - tooltip: 指标映射的提示
   */
  encoding?: 'yAxis' | 'detail' | 'color' | 'label' | 'tooltip'
}

export type BarMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - xAxis: 指标映射的x轴
   * - detail: 指标映射的详情
   * - color: 指标映射的颜色
   * - label: 指标映射的标签
   * - tooltip: 指标映射的提示
   */
  encoding?: 'xAxis' | 'detail' | 'color' | 'label' | 'tooltip'
}

export type BoxPlotMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - value: 离散的值对应的指标，用于计算统计值展示箱线图
   * - q1: 统计值 25 分位数对应的指标映射
   * - q3: 统计值 75 分位数对应的指标映射
   * - min: 盒须最小值的指标映射
   * - max: 盒须最大值的指标映射
   * - meadian: 统计值中位数的指标映射
   * - outliers: 异常值的指标映射
   * - detail: 指标映射的详情
   * - color: 指标映射的颜色
   * - label: 指标映射的标签
   * - tooltip: 指标映射的提示
   */
  encoding?: 'value' | 'q1' | 'q3' | 'min' | 'max' | 'median' | 'outliers' | 'color' | 'label' | 'tooltip'
}

export type LineMeasure = ColumnMeasure
export type AreaMeasure = ColumnMeasure
export type ColumnParallelMeasure = ColumnMeasure
export type ColumnPercentMeasure = ColumnMeasure
export type BarParallelMeasure = BarMeasure
export type BarPercentMeasure = BarMeasure

export type RadarMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - radius: 指标映射的半径
   * - color: 指标映射的颜色
   * - label: 指标映射的标签
   * - tooltip: 指标映射的提示
   */
  encoding?: 'radius' | 'color' | 'label' | 'tooltip'
}

export type RoseMeasure = RadarMeasure
export type RoseParallelMeasure = RadarMeasure

export type PieMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - angle: 指标映射的角度
   * - color: 指标映射的颜色
   * - label: 指标映射的标签
   * - tooltip: 指标映射的提示
   */
  encoding?: 'angle' | 'color' | 'label' | 'tooltip'
}

export type DonutMeasure = PieMeasure

export type FunnelMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - size: 指标映射的大小
   * - color: 指标映射的颜色
   * - label: 指标映射的标签
   * - tooltip: 指标映射的提示
   */
  encoding?: 'size' | 'color' | 'label' | 'tooltip'
}

export type HeatmapMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - color: 指标映射的颜色
   * - label: 指标映射的标签
   * - tooltip: 指标映射的提示
   */
  encoding?: 'color' | 'label' | 'tooltip'
}

export type ScatterMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - xAxis: 指标映射的x轴
   * - yAxis: 指标映射的y轴
   * - size: 指标映射的大小
   * - color: 指标映射的颜色
   * - label: 指标映射的标签
   * - tooltip: 指标映射的提示
   */
  encoding?: 'xAxis' | 'yAxis' | 'size' | 'color' | 'label' | 'tooltip'
}

export type HistogramMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - value: 直方图的值通道
   * - x0: 直方图的x0通道
   * - x1: 直方图的x1通道
   * - color: 指标映射的颜色
   * - label: 指标映射的标签
   * - tooltip: 指标映射的提示
   */
  encoding?: 'value' | 'x0' | 'x1' | 'color' | 'label' | 'tooltip'
}

export type DualAxisMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - primaryYAxis: 指标映射的主y轴
   * - secondaryYAxis: 指标映射的次y轴
   * - color: 指标映射的颜色
   * - label: 指标映射的标签
   * - tooltip: 指标映射的提示
   */
  encoding?: 'primaryYAxis' | 'secondaryYAxis' | 'color' | 'label' | 'tooltip'
  /**
   * @deprecated 设置该指标在双轴图中的图表类型, 仅适用于双轴图
   * - line: 折线图
   * - column: 柱状图
   * - columnParallel: 平行柱状图
   * - area: 面积图
   * - scatter: 散点图
   */
  chartType?: 'line' | 'column' | 'columnParallel' | 'area' | 'scatter'
}

export type TableMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - column: 指标列
   */
  encoding?: 'column'
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
  children?: (TableMeasure | MeasureGroup)[]
}
export type Measures = Measure[]
export type MeasureTree = (TableMeasure | MeasureGroup)[]
