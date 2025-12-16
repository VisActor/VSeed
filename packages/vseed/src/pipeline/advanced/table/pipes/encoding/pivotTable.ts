import { unique } from 'remeda'
import { findAllMeasures } from 'src/pipeline/utils'
import type { AdvancedPipe, Dimension, Dimensions, Encoding, Measure, Measures } from 'src/types'

export const encodingForPivotTable: AdvancedPipe = (advancedVSeed) => {
  const { measureTree = [], dimensionTree = [] } = advancedVSeed
  const measures = findAllMeasures(measureTree)

  const hasDimensionEncoding = dimensionTree.some((item: Dimension) => item.encoding)
  const hasMeasureEncoding = measures.some((item: Measure) => item.encoding)
  const encoding: Encoding = {}

  if (hasDimensionEncoding) {
    generateDimensionEncoding(dimensionTree, encoding)
  } else {
    generateDefaultDimensionEncoding(dimensionTree, encoding)
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
  encoding.tooltip = uniqueDimIds
  encoding.row = []
  encoding.column = []

  uniqueDimIds.forEach((item, index) => {
    if (index % 2 === 0) {
      encoding.column!.push(item)
    } else {
      encoding.row!.push(item)
    }
  })
}
const generateDimensionEncoding = (dimensions: Dimensions, encoding: Encoding) => {
  const uniqueDimIds = unique(dimensions.map((d) => d.id))
  encoding.tooltip = uniqueDimIds
  encoding.row = []
  encoding.column = []

  dimensions.forEach((dim, index) => {
    const id = dim.id
    if (dim.encoding === 'row') {
      encoding.row!.push(id)
    } else if (dim.encoding === 'column') {
      encoding.column!.push(id)
    } else {
      if (index % 2 === 0) {
        encoding.column!.push(id)
      } else {
        encoding.row!.push(id)
      }
    }
  })
}

/**
 * --------------------指标--------------------
 */
const generateDefaultMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  encoding.tooltip = unique(measures.map((item) => item.id))
  encoding.detail = unique(
    measures.filter((item) => item.encoding === 'detail' || !item.encoding).map((item) => item.id),
  )
}
const generateMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  encoding.tooltip = measures.map((item) => item.id)
  encoding.detail = unique(
    measures.filter((item) => item.encoding === 'detail' || !item.encoding).map((item) => item.id),
  )
}
