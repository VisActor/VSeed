import { unique } from 'remeda'
import { MeasureName } from 'src/dataReshape'
import { findAllMeasures } from 'src/pipeline/utils'
import type { AdvancedPipe, Dimension, Dimensions, Encoding, Measure, Measures } from 'src/types'

/**
 * @description 双轴图
 * 维度未包含任何`encoding`, 则使用默认映射规则:
 * 1. x: 第一个维度映射至X轴
 * 2. color: 非`X`轴所有维度与指标名称, 合并映射至颜色通道, 作为图例展示
 * 3. detail: 非`X`轴所有维度与指标名称, 映射至Detail通道
 * 指标未包含任何`encoding`, 则使用默认映射规则:
 * 1. y: 第一个指标映射至主Y轴, 其余指标映射至次Y轴
 * 2. tooltip: 全部指标映射至Tooltip
 *
 * 维度映射规则:
 * 1. 用户指定的`xAxis`维度映射至X轴, 支持多个维度; 若未指定, 则默认将第一个维度映射至X轴
 * 2. 用户指定的`color`维度映射至颜色通道, 支持多个维度; 若未指定, 则默认将指标名称映射至颜色通道, 作为图例展示
 * 3. 用户指定的`detail`维度映射至Detail通道, 支持多个维度; 若未指定, 则默认将指标名称映射至Detail通道
 * 指标映射规则:
 * 1. 指标未配置encoding, 则第一个指标默认映射至Y轴, 其余指标默认映射至次Y轴
 * 2. 用户指定的yAxis指标映射至主Y轴或次Y轴, 支持多个指标;
 * 3. 所有指标均映射到Tooltip
 */
export const encodingForDualAxis: AdvancedPipe = (advancedVSeed) => {
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
  const onlyMeasureName = dimensions.length === 1 && dimensions.find((item) => item.id === MeasureName)
  const uniqueDimIds = unique(dimensions.map((d) => d.id))
  encoding.x = uniqueDimIds.slice(0, 1) // 第一个维度放置于X轴
  encoding.color = uniqueDimIds.slice(onlyMeasureName ? 0 : 1) // 第二个之后的维度用于颜色
  encoding.detail = uniqueDimIds.slice(onlyMeasureName ? 0 : 1) // 第二个之后的维度用于详情
  encoding.tooltip = uniqueDimIds // 展示所有维度
  encoding.label = [] // 默认不展示标签
  encoding.row = [] // 默认不进行行透视
  encoding.column = [] // 默认不进行列透视
}
const generateDimensionEncoding = (dimensions: Dimensions, encoding: Encoding) => {
  encoding.x = unique(dimensions.filter((item) => item.encoding === 'xAxis').map((item) => item.id))
  encoding.color = unique(dimensions.filter((item) => item.encoding === 'color').map((item) => item.id))
  encoding.detail = unique(dimensions.filter((item) => item.encoding === 'detail').map((item) => item.id))
  if (encoding.x.length === 0) {
    encoding.x = [dimensions[0].id]
  }
  if (encoding.color.length === 0) {
    encoding.color = [MeasureName]
  }
  if (encoding.detail.length === 0) {
    encoding.detail = [MeasureName]
  }
}
/**
 * --------------------指标--------------------
 */
const generateDefaultMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  encoding.tooltip = unique(measures.map((item) => item.id))
  encoding.y = unique(
    measures
      .filter((item) => item.encoding === 'primaryYAxis' || item.encoding === 'secondaryYAxis' || !item.encoding)
      .map((item) => item.id),
  )
}
const generateMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  encoding.tooltip = measures.map((item) => item.id)
  encoding.y = unique(
    measures
      .filter((item) => item.encoding === 'primaryYAxis' || item.encoding === 'secondaryYAxis' || !item.encoding)
      .map((item) => item.id),
  )
  const color = unique(measures.filter((item) => item.encoding === 'color').map((item) => item.id))
  if (color.length > 0) {
    encoding.color = color
  }
  return encoding
}
