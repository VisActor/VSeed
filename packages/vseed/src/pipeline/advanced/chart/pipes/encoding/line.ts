import { unique } from 'remeda'
import { MeasureId } from 'src/dataReshape'
import { hasMultipleMeasureInSingleView } from 'src/pipeline/utils'
import type { AdvancedPipe, Dimension, Dimensions, Encoding, Measures } from 'src/types'
import { addColorToEncoding } from './color'
import { addDefaultColorEncoding } from './color/addColorToEncoding'

export const defaultEncodingForLine: AdvancedPipe = (advancedVSeed) => {
  const { reshapeMeasures = [], measures = [], dimensions = [] } = advancedVSeed
  const encoding: Encoding = {}
  generateDefaultDimensionEncoding(dimensions, encoding, hasMultipleMeasureInSingleView(reshapeMeasures))
  generateMeasureEncoding(measures, encoding)
  return { ...advancedVSeed, encoding }
}

export const encodingForLine: AdvancedPipe = (advancedVSeed) => {
  const { reshapeMeasures = [], measures = [], dimensions = [] } = advancedVSeed
  const hasDimensionEncoding = dimensions.some((item: Dimension) => item.encoding)
  const encoding: Encoding = {}
  const hasMulti = hasMultipleMeasureInSingleView(reshapeMeasures)

  if (hasDimensionEncoding) {
    generateDimensionEncoding(dimensions, encoding, hasMulti)
  } else {
    generateDefaultDimensionEncoding(dimensions, encoding, hasMulti)
  }

  generateMeasureEncoding(measures, encoding)

  return { ...advancedVSeed, encoding }
}

/**
 * --------------------维度--------------------
 */
const generateDefaultDimensionEncoding = (dimensions: Dimensions, encoding: Encoding, isMultiMeasure: boolean) => {
  const uniqueDimIds: string[] = unique(dimensions.map((d) => d.id))
  encoding.x = uniqueDimIds.slice(0, 1)
  addDefaultColorEncoding(uniqueDimIds, encoding, isMultiMeasure)
  encoding.tooltip = uniqueDimIds.filter((d) => d !== MeasureId) // 展示指标Id之外的所有维度
  encoding.detail = [] // 折线图暂不支持细分
  encoding.label = []
  encoding.row = []
  encoding.column = []
}
const generateDimensionEncoding = (dimensions: Dimensions, encoding: Encoding, isMultiMeasure: boolean) => {
  // x
  encoding.x = unique(dimensions.filter((item) => item.encoding === 'xAxis').map((item) => item.id))
  if (encoding.x.length === 0) {
    encoding.x = [dimensions[0].id]
  }

  // color
  addColorToEncoding(dimensions, encoding, isMultiMeasure)

  // detail
  encoding.detail = unique(dimensions.filter((item) => item.encoding === 'detail').map((item) => item.id))
  if (encoding.detail.length === 0) {
    encoding.detail = [MeasureId]
  }

  // tooltip
  encoding.tooltip = unique(dimensions.map((item) => item.id))
  encoding.tooltip = encoding.tooltip.filter((d) => d !== MeasureId)

  // label
  encoding.label = unique(dimensions.filter((item) => item.encoding === 'label').map((item) => item.id))
  encoding.label = encoding.label.filter((d) => d !== MeasureId)
}

/**
 * --------------------指标--------------------
 */
const generateMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  // y
  encoding.y = unique(measures.filter((item) => item.encoding === 'yAxis' || !item.encoding).map((item) => item.id))

  // color
  const color = unique(measures.filter((item) => item.encoding === 'color').map((item) => item.id))
  if (color.length > 0) {
    encoding.color = color
  }

  // label
  const label = unique(measures.filter((item) => item.encoding === 'label').map((item) => item.id))
  encoding.label = unique([...(encoding.label || []), ...label])

  // tooltip
  const tooltip = unique(measures.filter((item) => item.encoding === 'tooltip').map((item) => item.id))
  encoding.tooltip = unique([...(encoding.tooltip || []), ...label, ...tooltip, ...color])
}
