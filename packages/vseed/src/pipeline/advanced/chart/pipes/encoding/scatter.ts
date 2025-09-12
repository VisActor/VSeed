import { unique } from 'remeda'
import { MeasureName } from 'src/dataReshape'
import { findAllMeasures } from 'src/pipeline/utils'
import type { AdvancedPipe, Dimension, Dimensions, Encoding, Measure, Measures } from 'src/types'

/**
 * @description 散点图
 * 维度未包含任何`encoding`, 则使用默认映射规则:
 * 1. color: 所有维度与指标名称, 合并映射至颜色通道, 作为图例展示
 * 2. detail: 所有维度与指标名称, 映射至Detail通道
 * 指标未包含任何`encoding`, 则使用默认映射规则:
 * 1. x: 第一个指标映射至X轴
 * 2. y: 第二个及其之后的指标映射至Y轴
 * 3. tooltip: 全部指标映射至Tooltip
 *
 * 维度映射规则:
 * 2. 用户指定的`color`维度映射至颜色通道, 支持多个维度; 若未指定, 则默认将指标名称映射至颜色通道, 作为图例展示
 * 3. 用户指定的`detail`维度映射至Detail通道, 支持多个维度; 若未指定, 则无detail
 * 指标映射规则:
 * 1. 指标未配置encoding, 则第一个指标默认映射至X轴, 第二个指标默认映射至Y轴
 * 2. 用户指定的yAxis指标映射至Y轴X轴, 支持多个指标;
 * 3. 所有指标均映射到Tooltip
 */
export const encodingForScatter: AdvancedPipe = (advancedVSeed) => {
  const { measures: vseedMeasures = [], dimensions = [] } = advancedVSeed
  // prepare measures and dimensions
  const measures = findAllMeasures(vseedMeasures)

  // exist encoding condition
  const hasDimensionEncoding = dimensions.some((item: Dimension) => item.encoding)
  const hasMeasureEncoding = measures.some((item: Measure) => item.encoding)

  // encoding for modify in place
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
  const dimensionsWithoutMeasureName = dimensions.filter((item) => item.id !== MeasureName)
  const uniqueDimIds = unique(dimensionsWithoutMeasureName.map((d) => d.id))
  encoding.color = uniqueDimIds.slice(0)
  encoding.detail = uniqueDimIds.slice(0)
  encoding.tooltip = uniqueDimIds // 展示所有维度
  encoding.label = [] // 默认不展示标签
  encoding.row = [] // 默认不进行行透视
  encoding.column = [] // 默认不进行列透视
}
const generateDimensionEncoding = (dimensions: Dimensions, encoding: Encoding) => {
  encoding.color = unique(dimensions.filter((item) => item.encoding === 'color').map((item) => item.id))
  encoding.detail = unique(dimensions.filter((item) => item.encoding === 'detail').map((item) => item.id))
  if (encoding.color.length === 0) {
    encoding.color = [MeasureName]
  }
}

/**
 * --------------------指标--------------------
 */
const generateDefaultMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  encoding.tooltip = unique(measures.map((item) => item.id))
  encoding.y = unique(
    measures
      .filter((item) => item.encoding === 'xAxis' || item.encoding === 'yAxis' || !item.encoding)
      .map((item) => item.id),
  )
}
const generateMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  encoding.tooltip = measures.map((item) => item.id)
  encoding.y = unique(
    measures
      .filter((item) => item.encoding === 'xAxis' || item.encoding === 'yAxis' || !item.encoding)
      .map((item) => item.id),
  )
  const color = unique(measures.filter((item) => item.encoding === 'color').map((item) => item.id))
  if (color.length > 0) {
    encoding.color = [color[0]]
  }
}
