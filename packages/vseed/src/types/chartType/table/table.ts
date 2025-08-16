import { z } from 'zod'
import { zLocale, type Locale } from '../../i18n'
import type { DimensionTree, MeasureTree } from '../../properties'
import {
  zBackgroundColor,
  zDataset,
  zDimensions,
  zMeasureTree,
  zTheme,
  type BackgroundColor,
  type Dataset,
  type Theme,
} from '../../properties'

/**
 * 表格类型定义
 * @description 表格，适用于详细数据展示场景，行列分明，便于查看具体数值
 * 适用场景:
 * - 需要展示详细数据明细
 * - 数据项需要精确比对
 * - 展示多维度数据属性
 * 数据要求:
 * - 至少1个维度字段
 * - 至少1个度量字段
 * - 维度字段会作为表格的列标题
 * 默认开启的功能:
 * - 默认开启排序、筛选、分页功能
 */
export interface Table {
  /**
   * 表格
   * @description 标准表格组件，用于展示详细数据
   * @type {'table'}
   * @example 'table'
   */
  chartType: 'table'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, 一个字段对应一列, 一个记录对应一行
   * @type {Array<Record<string|number, any>>}
   * @example [{id: 1, name: "A", value: 100}, {id: 2, name: "B", value: 200}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 表格的每个维度会对应一列
   * @type {Dimensions}
   * @example [{id: "name", alias: "名称"}]
   */
  dimensions?: DimensionTree

  /**
   * 指标
   * @description 表格的每个指标会对应一行, 并且天生支持指标组合.
   * @type {Measures}
   * @example [{id: "value", alias: "数值"}]
   */
  measures?: MeasureTree

  /**
   * 图表的背景颜色
   * @default transparent 默认为透明背景
   * @description 背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'
   */
  backgroundColor?: BackgroundColor

  /**
   * 图表的主题, 主题是优先级较低的功能配置, 包含所有图表类型共用的通用配置, 与单类图表类型共用的图表配置
   * @default light 默认为亮色主题
   * @description 内置light与dark两种主题, 用户可以通过Builder自定义主题
   * @example 'dark'
   * @example 'light'
   * @example 'customThemeName'
   */
  theme?: Theme

  /**
   * 语言
   * @description 图表语言配置, 支持'zh-CN'与'en-US'两种语言, 另外可以调用 intl.setLocale('zh-CN') 方法设置语言
   * @default 'zh-CN'
   */
  locale?: Locale
}

export const zTable = z.object({
  chartType: z.literal('table'),
  dataset: zDataset.optional(),
  dimensions: zDimensions.optional(),
  measures: zMeasureTree.optional(),
  backgroundColor: zBackgroundColor.optional(),
  theme: zTheme.optional(),
  locale: zLocale.optional(),
})
