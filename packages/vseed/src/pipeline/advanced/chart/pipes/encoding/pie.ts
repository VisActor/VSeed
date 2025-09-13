import { unique } from 'remeda'
import { MeasureName } from 'src/dataReshape'
import { findAllMeasures } from 'src/pipeline/utils'
import type { AdvancedPipe, Dimension, Dimensions, Encoding, Measure, Measures } from 'src/types'

/**
 * @description 饼图、环形图
 * 维度未包含任何`encoding`, 则使用默认映射规则:
 * 1. color: 所有维度, 合并映射至颜色通道, 作为图例展示
 * 2. detail: 所有维度, 映射至Detail通道
 * 指标未包含任何`encoding`, 则使用默认映射规则:
 * 1. angle: 全部指标映射至angle轴
 * 2. tooltip: 全部指标映射至Tooltip
 *
 * 维度映射规则:
 * 1. 用户指定的`color`维度映射至颜色通道, 支持多个维度; 若未指定, 则默认将指标名称映射至颜色通道, 作为图例展示
 * 2. 用户指定的`detail`维度映射至Detail通道, 支持多个维度; 若未指定, 则默认将指标名称映射至Detail通道
 * 指标映射规则:
 * 1. 指标未配置`encoding`, 则默认映射至angle轴;
 * 2. 用户指定的`angle`指标映射至angle轴, 支持多个指标;
 * 3. 用户指定的`color`指标映射至color通道, 支持多个指标;
 * 3. 所有指标均映射到Tooltip
 */
export const encodingForPie: AdvancedPipe = (advancedVSeed) => {
  const { measures: vseedMeasures = [], dimensions = [] } = advancedVSeed
  const measures = findAllMeasures(vseedMeasures)

  const hasDimensionEncoding = dimensions.some((item: Dimension) => item.encoding)
  const hasMeasureEncoding = measures.some((item: Measure) => item.encoding)
  const encoding: Encoding = {}

  if (hasDimensionEncoding) {
    generateDimensionEncoding(dimensions, encoding)
  } else {
    generateDefaultDimensionEncoding(dimensions, encoding)
  }

  if (hasMeasureEncoding) {
    generateMeasureEncoding(measures, encoding)
  } else {
    generateDefaultMeasureEncoding(measures, encoding)
  }

  return { ...advancedVSeed, encoding }
}

/**
 * --------------------维度--------------------
 */
const generateDefaultDimensionEncoding = (dimensions: Dimensions, encoding: Encoding) => {
  const uniqueDimIds = unique(dimensions.map((d) => d.id))
  encoding.color = uniqueDimIds.slice(0) // 第1个之后的维度用于颜色
  encoding.detail = uniqueDimIds.slice(0) // 第1个之后的维度用于详情
  encoding.tooltip = uniqueDimIds.filter((d) => d !== MeasureName) // 展示指标名称之外的所有维度
  encoding.label = [] // 默认不展示标签
  encoding.row = [] // 默认不进行行透视
  encoding.column = [] // 默认不进行列透视
}
const generateDimensionEncoding = (dimensions: Dimensions, encoding: Encoding) => {
  // color
  encoding.color = unique(dimensions.filter((item) => item.encoding === 'color').map((item) => item.id))
  if (encoding.color.length === 0) {
    encoding.color = [MeasureName]
  }

  // detail
  encoding.detail = unique(dimensions.filter((item) => item.encoding === 'detail').map((item) => item.id))
  if (encoding.detail.length === 0) {
    encoding.detail = [MeasureName]
  }

  // tooltip
  encoding.tooltip = unique(dimensions.map((item) => item.id))
  encoding.tooltip = encoding.tooltip.filter((d) => d !== MeasureName)
}

/**
 * --------------------指标--------------------
 */
const generateDefaultMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  encoding.angle = unique(measures.filter((item) => item.encoding === 'angle' || !item.encoding).map((item) => item.id))
}
const generateMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  // angle
  encoding.angle = unique(measures.filter((item) => item.encoding === 'angle' || !item.encoding).map((item) => item.id))

  // color
  const color = unique(measures.filter((item) => item.encoding === 'color').map((item) => item.id))
  if (color.length > 0) {
    encoding.color = color
  }

  // tooltip
  const tooltip = unique(measures.filter((item) => item.encoding === 'tooltip').map((item) => item.id))
  encoding.tooltip = unique([...(encoding.tooltip || []), ...tooltip])
}
