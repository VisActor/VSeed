import { unique } from 'remeda'
import { MeasureName } from 'src/dataReshape'
import { findAllMeasures } from 'src/pipeline/utils'
import type { AdvancedPipe, Dimension, Dimensions, Encoding, Measure, Measures } from 'src/types'

export const encodingForRose: AdvancedPipe = (advancedVSeed) => {
  const { measures: vseedMeasures = [], dimensions = [] } = advancedVSeed
  const measures = findAllMeasures(vseedMeasures)

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
  const onlyMeasureName = dimensions.length === 1 && dimensions.find((item) => item.id === MeasureName)
  const uniqueDimIds = unique(dimensions.map((d) => d.id))
  encoding.angle = uniqueDimIds.slice(0, 1) // 第一个维度放置于X轴
  encoding.color = uniqueDimIds.slice(onlyMeasureName ? 0 : 1) // 第二个之后的维度用于颜色
  encoding.detail = uniqueDimIds.slice(onlyMeasureName ? 0 : 1) // 第二个之后的维度用于详情
  encoding.tooltip = uniqueDimIds.filter((d) => d !== MeasureName) // 展示指标名称之外的所有维度
  encoding.label = [] // 默认不展示标签
  encoding.row = [] // 默认不进行行透视
  encoding.column = [] // 默认不进行列透视
}
const generateDimensionEncoding = (dimensions: Dimensions, encoding: Encoding) => {
  // angle
  encoding.angle = unique(dimensions.filter((item) => item.encoding === 'angle').map((item) => item.id))
  if (encoding.angle.length === 0) {
    encoding.angle = [dimensions[0].id]
  }

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
  encoding.radius = unique(
    measures.filter((item) => item.encoding === 'radius' || !item.encoding).map((item) => item.id),
  )
}
const generateMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  // y
  encoding.radius = unique(
    measures.filter((item) => item.encoding === 'radius' || !item.encoding).map((item) => item.id),
  )

  // color
  const color = unique(measures.filter((item) => item.encoding === 'color').map((item) => item.id))
  if (color.length > 0) {
    encoding.color = color
  }

  // tooltip
  const tooltip = unique(measures.filter((item) => item.encoding === 'tooltip').map((item) => item.id))
  encoding.tooltip = unique([...(encoding.tooltip || []), ...tooltip])
}
