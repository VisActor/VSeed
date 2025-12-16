import { unique } from 'remeda'
import { MeasureId } from 'src/dataReshape'
import type { AdvancedPipe, Dimension, Dimensions, Encoding, Measure, Measures } from 'src/types'
import { addColorToEncoding } from './color'

export const defaultEncodingForHistogram: AdvancedPipe = (advancedVSeed) => {
  const { measures = [], dimensions = [] } = advancedVSeed
  const encoding: Encoding = {}

  generateDefaultDimensionEncoding(dimensions, encoding)
  generateDefaultMeasureEncoding(measures, encoding)
  return { ...advancedVSeed, encoding }
}

export const encodingForHistogram: AdvancedPipe = (advancedVSeed) => {
  const { measures = [], dimensions = [] } = advancedVSeed

  const hasDimensionEncoding = dimensions.some((item: Dimension) => item.encoding)
  const hasMeasureEncoding = measures.some((item: Measure) => item.encoding)
  const encoding: Encoding = {}

  if (hasDimensionEncoding) {
    generateDimensionEncoding(dimensions, encoding, false)
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
  const dimensionsWithoutMeasureId = dimensions.filter((item) => item.id !== MeasureId)
  const uniqueDimIds = unique(dimensionsWithoutMeasureId.map((d) => d.id))

  encoding.detail = encoding.color
  encoding.tooltip = uniqueDimIds.filter((d: string) => d !== MeasureId) // 展示指标名称之外的所有维度
  encoding.label = [] // 默认不展示标签
  encoding.row = [] // 默认不进行行透视
  encoding.column = [] // 默认不进行列透视
}
const generateDimensionEncoding = (dimensions: Dimensions, encoding: Encoding, isMultiMeasure: boolean) => {
  // color
  addColorToEncoding(dimensions, encoding, isMultiMeasure)

  // detail
  encoding.detail = unique(dimensions.filter((item) => item.encoding === 'detail').map((item) => item.id))
  if (encoding.detail?.length === 0) {
    encoding.detail = encoding.color
  }

  // tooltip
  encoding.tooltip = unique(dimensions.map((item) => item.id))
  encoding.tooltip = encoding.tooltip?.filter((d) => d !== MeasureId)

  // label
  encoding.label = unique(dimensions.filter((item) => item.encoding === 'label').map((item) => item.id))
  encoding.label = encoding.label?.filter((d) => d !== MeasureId)
}

/**
 * --------------------指标--------------------
 */
const generateDefaultMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  encoding.value = unique(measures.filter((item) => item.encoding === 'value' || !item.encoding).map((item) => item.id))
  encoding.x0 = unique(measures.filter((item) => item.encoding === 'x0').map((item) => item.id))
  encoding.x1 = unique(measures.filter((item) => item.encoding === 'x1').map((item) => item.id))
  encoding.y = unique(measures.filter((item) => item.encoding === 'yAxis').map((item) => item.id))
}
const generateMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  encoding.value = unique(measures.filter((item) => item.encoding === 'value' || !item.encoding).map((item) => item.id))
  encoding.x0 = unique(measures.filter((item) => item.encoding === 'x0').map((item) => item.id))
  encoding.x1 = unique(measures.filter((item) => item.encoding === 'x1').map((item) => item.id))
  encoding.y = unique(measures.filter((item) => item.encoding === 'yAxis').map((item) => item.id))
  const color = unique(measures.filter((item) => item.encoding === 'color').map((item) => item.id))
  if (color.length > 0) {
    encoding.color = [color[0]]
  }

  // label
  const label = unique(measures.filter((item) => item.encoding === 'label').map((item) => item.id))
  encoding.label = unique([...(encoding.label || []), ...label])

  // tooltip
  const tooltip = unique(measures.filter((item) => item.encoding === 'tooltip').map((item) => item.id))
  encoding.tooltip = unique([...(encoding.tooltip || []), ...label, ...tooltip])
}
