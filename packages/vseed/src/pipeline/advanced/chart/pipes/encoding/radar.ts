import { unique } from 'remeda'
import { MeasureName } from 'src/dataReshape'
import { findAllMeasures } from 'src/pipeline/utils'
import type { AdvancedPipe, Dimension, Dimensions, Encoding, Measure, Measures } from 'src/types'

export const defaultEncodingForRadar: AdvancedPipe = (advancedVSeed) => {
  const { measures: vseedMeasures = [], dimensions = [] } = advancedVSeed
  const measures = findAllMeasures(vseedMeasures)
  const encoding: Encoding = {}
  generateDefaultDimensionEncoding(dimensions, encoding)
  generateDefaultMeasureEncoding(measures, encoding)
  return { ...advancedVSeed, encoding }
}

export const encodingForRadar: AdvancedPipe = (advancedVSeed) => {
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
  encoding.angle = uniqueDimIds.slice(0, 1)
  encoding.color = uniqueDimIds.slice(1)
  encoding.tooltip = uniqueDimIds.filter((d) => d !== MeasureName) // 展示指标名称之外的所有维度
  encoding.detail = [] // 雷达图暂不支持细分
  encoding.label = []
  encoding.row = []
  encoding.column = []
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
  encoding.detail = []
  if (encoding.detail.length === 0) {
    encoding.detail = [MeasureName]
  }

  // tooltip
  encoding.tooltip = unique(dimensions.map((item) => item.id))
  encoding.tooltip = encoding.tooltip.filter((d) => d !== MeasureName)

  // label
  encoding.label = unique(dimensions.filter((item) => item.encoding === 'label').map((item) => item.id))
  encoding.label = encoding.label.filter((d) => d !== MeasureName)
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
  // radius
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
